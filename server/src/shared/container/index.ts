import { container, inject } from "tsyringe";
import { AlphaApiClient } from "../api/apiClient";
import { IDateProvider } from "../providers/dateProvider/IDateProvider";
import { DateProvider } from "../providers/dateProvider/DateProvider";

container.registerInstance<IDateProvider>("DateProvider", new DateProvider());
container.register<AlphaApiClient>('ClientApi', {
    useFactory: () => new AlphaApiClient(process.env.API_KEY!, container.resolve('DateProvider')),
  });