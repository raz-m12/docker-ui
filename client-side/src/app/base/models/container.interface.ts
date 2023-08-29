export interface ProjectTableElement {
  id: string;
  name: string;
  status: boolean;
  action?: string;
  path: string;
  yaml?: string;


}

export interface Container {
  Labels: Labels;
  State: string;
  data: ContainerData;
  out: string;
}

interface ContainerData {
  services: Service[];
}
interface Service {
  state: string;
}

interface Labels {
  "com.docker.compose.project": string;
}

export interface Project {
  id: string;
  path: string;
  yaml: string;
}

export interface Projects {
  projects: Project[];
  containers: Container[];
}
