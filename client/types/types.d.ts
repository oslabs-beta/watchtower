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