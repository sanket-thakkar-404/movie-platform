import { AlertTriangle } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
    <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
    <p className="text-sm text-destructive">{message}</p>
  </div>
);

export default ErrorMessage;
