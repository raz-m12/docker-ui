import { Injectable } from '@angular/core';
import {ContainerResult} from "../models/container.interface";
import {env} from "../../../../config/environment";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {map} from "rxjs";
import {ContainerService} from "./container.service";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(public httpClient: HttpClient, public toastr: ToastrService, public router: Router, public CS: ContainerService) {
  }

  callback(cmd: string, refresh = false) {
    return (data: ContainerResult) => {
      if (data.success) {
        this.toastr.success(`${cmd}: success`);
        if(refresh)
          this.CS.refreshProjects();
      }
      else
        this.toastr.error(`${cmd}: failure`);

      this.CS.setOperationPending(false);
    }
  }

  /**
   * Build project with given id
   * @param id of project to build
   */
  build(id: string) {
    this.CS.setOperationPending(true);
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "build",  {
      id: id
    }).pipe(map(this.callback("docker-compose build")));
  }

  /**
   * Force stop all services of project with given id
   * @param id of project
   */
  kill(id: string) {
    this.CS.setOperationPending(true);
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "kill",  {
      id: id
    }).pipe(map(this.callback("docker-compose kill", true)));
  }

  /**
   * Stop running containers without removing them
   * @param id of project
   */
  stop(id: string) {
    this.CS.setOperationPending(true);
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "stop",  {
      id: id
    }).pipe(map(this.callback("docker-compose stop", true)));
  }

  /**
   * Restart all services
   * @param id of project
   */
  restart(id: string) {
    this.CS.setOperationPending(true);
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "restart",  {
      id: id
    }).pipe(map(this.callback("docker-compose restart", true)));
  }

  /**
   * Builds, (re)creates, starts, and attaches to containers for all services
   * @param id of project
   */
  composeUp(id: string) {
    this.CS.setOperationPending(true);
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "composeUp",  {
      id: id
    }).pipe(map(this.callback("docker-compose up", true)));
  }

  /**
   * Stops containers and removes containers, networks, volumes, and images created by up
   * @param id of project
   */
  composeDown(id: string) {
    this.CS.setOperationPending(true);
    return this.httpClient.post<ContainerResult>(env.serverEndpoint + "composeDown",  {
      id: id
    }).pipe(map(this.callback("docker-compose down", true)));
  }

  /**
   * Show logs of service(s) contained in project with given id
   * @param id of project
   */
  getLogs(id: string) {
    this.CS.setOperationPending(true);
    return this.httpClient.get<ContainerResult>(env.serverEndpoint + `logs/${id}`)
      .pipe(map(this.callback("docker-compose logs")));
  }
}
