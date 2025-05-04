import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { intervalOptions } from "../lib/constants";
import { ClockIcon } from "lucide-react";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export default function IntervalSelector({ value, setValue }: Props) {
  return (
    <Select value={value} onValueChange={(value) => setValue(value)}>
      <SelectTrigger className="w-[120px] justify-start" icon={false}>
        <ClockIcon />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-background-toss-secondary border-0">
        {intervalOptions.map((option, index) => (
          <SelectItem
            key={option.value + index}
            value={option.value}
            className="capitalize"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
