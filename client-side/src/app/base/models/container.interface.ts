
export interface ProjectTableElement {
  id: string;
  name: string;
  status: boolean;
  action?: string;
  composeDir: string;
  projectName: string;
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
  composePath: string;
  composeDir: string;
  projectName: string;
  yaml: string;
  isActive: (cs: Container[]) => boolean;
}

export interface Projects {
  projects: Project[];
  containers: Container[];
}

export interface ContainerResult {
  success: boolean
}
