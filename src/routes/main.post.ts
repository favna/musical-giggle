import { ApiRequest, ApiResponse, Route } from '@sapphire/plugin-api';

export class UserRoute extends Route {
  public constructor(context: Route.LoaderContext, options?: Route.Options) {
    super(context, {
      ...options,
      route: ''
    });
  }

  public override run(_request: ApiRequest, response: ApiResponse) {
    response.json({ message: 'Landing Page!' });
  }
}
