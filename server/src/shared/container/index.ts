import { container } from "tsyringe";
import { IApiClient } from "../api/IApiClient";
import { AlphaApiClient } from "../api/apiClient";

container.registerInstance<IApiClient>("ClientApi", new AlphaApiClient(process.env.API_KEY!));