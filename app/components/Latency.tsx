import {
  isLatencyMessage,
  useVoiceBot,
  type LatencyMessage,
} from "app/context/VoiceBotContextProvider";
import type { FC } from "react";
import { LightningIcon } from "./icons/LightningIcon";
import { useSearchParams } from "next/navigation";
import { latencyMeasurementQueryParam } from "app/lib/constants";

interface Props {
  className?: string;
  message?: LatencyMessage;
}

const formatMs = (seconds: number): string => {
  return `${Math.round(seconds * 1000)} ms`;
};

const Latency: FC<Props> = ({ className, message }: Props) => {
  const { messages } = useVoiceBot();
  const searchParams = useSearchParams();

  const displayMessage = message || messages.findLast(isLatencyMessage);

  return displayMessage && searchParams.get(latencyMeasurementQueryParam) ? (
    <div className={`flex items-center gap-1 text-gray-450 text-xs font-fira ${className}`}>
      <LightningIcon className="mb-0.5 flex-shrink-0" />
      Latency:
      {" " +
        formatMs(
          displayMessage.total_latency || displayMessage.tts_latency + displayMessage.ttt_latency,
        )}
    </div>
  ) : (
    <></>
  );
};

export default Latency;
