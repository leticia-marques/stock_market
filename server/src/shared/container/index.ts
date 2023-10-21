import { container } from "tsyringe";
import { AlphaApiClient } from "../api/apiClient";
import { IDateProvider } from "../providers/dateProvider/IDateProvider";
import { DateProvider } from "../providers/dateProvider/DateProvider";
import { IApiClient } from "@shared/api/IApiClient";

container.registerSingleton<IDateProvider>("DateProvider", DateProvider);
container.registerInstance<IApiClient>("ClientApi", new AlphaApiClient(process.env.API_KEY!));