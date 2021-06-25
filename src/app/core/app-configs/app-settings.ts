import {Injectable} from "@angular/core";
import {EndPoints} from "./end-points";


@Injectable()
export class AppSettings {

  public User = {
    url: {
      base: EndPoints.uriApi("user/")
    }
  };

  public Role = {
    url: {
      base: EndPoints.uriApi("role/")
    }
  };

  public Product = {
    url: {
      base: EndPoints.uriApi("product/")
    }
  };

}
