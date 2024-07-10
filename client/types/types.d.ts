export interface ProvisionFormData {
  //removed AWS account name for MVP as a stretch feature we would like users to have the option to switch between accounts
  //aWSAccountName: string;
  tableName: string;
  startTime: Date | null;
  endTime: Date | null;
}

export interface StatusBoxProps {
  onSubmit: (data: ProvisionFormData) => void;
}

interface GraphContainerProps {
  currentProvision: ProvisionFormData | null;
}

interface RcuGraphContainerProps {
  provisionData: ProvisionFormData;
  metrics: any;
}

interface WcuGraphContainerProps {
  provisionData: ProvisionFormData;
  metrics: any;
}

interface TotalTimeContainerProps {
  provisionData: ProvisionFormData;
  metrics: any;
}
