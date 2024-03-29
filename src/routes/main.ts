import { ApiRequest, ApiResponse, methods, Route } from '@sapphire/plugin-api';

export class UserRoute extends Route {
  public constructor(context: Route.LoaderContext, options?: Route.Options) {
    super(context, {
      ...options,
      route: ''
    });
  }

  public [methods.GET](_request: ApiRequest, response: ApiResponse) {
    response.json({ message: 'Landing Page!' });
  }

  public [methods.POST](_request: ApiRequest, response: ApiResponse) {
    response.json({ message: 'Landing Page!' });
  }
}
