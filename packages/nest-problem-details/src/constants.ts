export interface IDefaultHTTPErrors {
  [status: number]: string;
}

export const defaultHttpErrors: IDefaultHTTPErrors = {
  400: 'bad_request',
  401: 'unauthorized',
  402: 'payment_required',
  403: 'forbidden',
  404: 'not_found',
  405: 'method_not_allowed',
  406: 'not_acceptable',
  407: 'proxy_authentication_required',
  408: 'request_timeout',
  409: 'conflict',
  410: 'gone',
  411: 'length_required',
  412: 'precondition_failed',
  413: 'payload_too_large',
  414: 'uri_too_long',
  415: 'unsupported_media_type',
  416: 'requested_range_not_satisfiable',
  417: 'expectation_failed',
  418: 'i_am_a_teapot',
  421: 'misdirected',
  422: 'unprocessable_entity',
  424: 'failed_dependency',
  429: 'too_many_requests',
  500: 'internal_server_error',
  501: 'not_implemented',
  502: 'bad_gateway',
  503: 'service_unavailable',
  504: 'gateway_timeout',
  505: 'http_version_not_supported'
};

// Provider keys
export const BASE_PROBLEMS_URI_KEY = 'BASE_PROBLEMS_URI';
export const HTTP_ERRORS_MAP_KEY = 'HTTP_ERRORS_MAP';
export const HTTP_EXCEPTION_FILTER_KEY = 'HTTP_EXCEPTION_FILTER';
