export interface ProvisionFormData {
  aWSAccountName: string;
  tableName: string;
  startTime: Date | null;
  endTime: Date | null;
}

export interface StatusBoxProps {
  onSubmit: (data: ProvisionFormData) => void;
}