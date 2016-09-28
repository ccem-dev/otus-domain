package br.org.domain.log;

import br.org.domain.auditor.AuditorService;
import br.org.domain.auditor.dto.LogEntryDto;
import br.org.domain.security.AuthorizationHeaderReader;
import br.org.domain.security.services.SecurityContextService;
import org.apache.commons.io.IOUtils;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.core.HttpHeaders;
import java.io.IOException;
import java.text.ParseException;
import java.util.Map;

@WebFilter(filterName = "auditorFilter", urlPatterns = {"/v01/*"})
public class AuditorServletFilter implements Filter {

    @Inject
    private SecurityContextService securityContextService;
    @EJB
    private AuditorService auditorService;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        ResettableStreamHttpServletRequest resettableStreamHttpServletRequest = new ResettableStreamHttpServletRequest(httpServletRequest);

        if (isLoggedMethod(httpServletRequest.getMethod())) {
            BodyLog bodyLog = new BodyLog(IOUtils.toString(resettableStreamHttpServletRequest.getReader()));
            String authorizationHeader = resettableStreamHttpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);
            String token = readToken(authorizationHeader);
            String userId = readUserId(token);
            String remoteAddress = resettableStreamHttpServletRequest.getRemoteAddr();
            String url = resettableStreamHttpServletRequest.getRequestURL().toString();
            Map<String, String[]> parameterMap = resettableStreamHttpServletRequest.getParameterMap();

            auditorService.log(new LogEntryDto(remoteAddress, url, bodyLog.getBody(), userId, parameterMap, token));
            resettableStreamHttpServletRequest.resetInputStream();
        }

        filterChain.doFilter(resettableStreamHttpServletRequest, servletResponse);
        return;
    }

    @Override
    public void destroy() {
    }

    private Boolean isLoggedMethod(String method) {
        if (HttpMethod.POST.equals(method) || HttpMethod.DELETE.equals(method) || HttpMethod.PUT.equals(method)) {
            return Boolean.TRUE;
        } else {
            return Boolean.FALSE;
        }
    }

    private String readToken(String authorizationHeader) {
        if (authorizationHeader != null) {
            try {
                return AuthorizationHeaderReader.readToken(authorizationHeader);
            } catch (NotAuthorizedException e) {
                return "";
            }
        } else {
            return "";
        }
    }

    private String readUserId(String token) {
        try {
            return securityContextService.getUserId(token);
        } catch (ParseException e) {
            return "";
        }
    }
}

