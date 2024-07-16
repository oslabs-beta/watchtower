export interface ProvisionFormData {
  //removed AWS account name for MVP as a stretch feature we would like users to have the option to switch between accounts
  //aWSAccountName: string;
  tableName: string;
  startTime: any;
  endTime: any;
}

export interface DataStatsProps {
  provisionData: ProvisionFormData;
  currentMetrics: any | null;
}

export interface ReportsProps {
  timeFrame?: string;
}

export interface StatusBoxProps {
  onSubmit: (data: ProvisionFormData) => void;
}

export interface GraphContainerProps {
  currentProvision: ProvisionFormData | null;
  currentMetrics: any | null;
}

export interface RcuGraphContainerProps {
  provisionData: ProvisionFormData;
  metrics: any;
}

export interface WcuGraphContainerProps {
  provisionData: ProvisionFormData;
  metrics: any;
}

export interface BedrockAnalysisProps {
  currentProvision: ProvisionFormData | null;
  currentMetrics: any | null;
  fetchAnalysis: () => Promise<any>;
}

export interface TitleProps {
  children?: React.ReactNode;
}
