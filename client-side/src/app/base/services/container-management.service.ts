import { Injectable } from '@angular/core';
import {ContainerResult} from "../models/container.interface";
import {env} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {ContainerService} from "./container.service";

@Injectable({
  providedIn: 'root'
})
export class ContainerManagementService {

  constructor(public httpClient: HttpClient, public toastr: ToastrService, public router: Router, public CS: ContainerService) {
  }

  /**
   * Build project with given id
   * @param id of project to build
   */
  build(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "build",  {
      id: id
    }).pipe(map((data) => {
      if(data.success)
        this.toastr.success("Successfully built the container");
      else
        this.toastr.error("Build process failed");
    }));
  }

  /**
   * Force stop all services of project with given id
   * @param id of project
   */
  kill(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "kill",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Successfully killed the container");
        this.CS.refreshProjects();
      }
      else
        this.toastr.success("Kill command failed");
    }));
  }

  /**
   * Stop running containers without removing them
   * @param id of project
   */
  stop(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "stop",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Successfully stopped all containers");
        this.CS.refreshProjects();
      }
      else
        this.toastr.success("Failed to stop some container");
    }));
  }

  /**
   * Restart all services
   * @param id of project
   */
  restart(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "restart",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Successfully restarted the container");
        this.CS.refreshProjects();
      }
      else
        this.toastr.error("Failed to restart some container");
    }));
  }

  /**
   * Builds, (re)creates, starts, and attaches to containers for all services
   * @param id of project
   */
  composeUp(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "composeUp",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Composed up successfully");
        this.CS.refreshProjects();
      }
      else
        this.toastr.error("Composed up failed");
    }));
  }

  /**
   * Stops containers and removes containers, networks, volumes, and images created by up
   * @param id of project
   */
  composeDown(id: string) {
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "composeDown",  {
      id: id
    }).pipe(map((data) => {
      if(data.success) {
        this.toastr.success("Compose down was successful");
        this.CS.refreshProjects();
      }
      else
        this.toastr.error("Compose down failed");
    }));
  }

  /**
   * Show logs of service(s) contained in project with given id
   * @param id of project
   */
  getLogs(id: string) {
    return this.httpClient.get<ContainerResult>(env.serverEndpoint + `logs/${id}`)
      .pipe(map((data) => {
        if(data.success) {
          this.toastr.success("Get logs was successful");
        }
        else
          this.toastr.error("Failure while getting logs");
      }));
  }

}
