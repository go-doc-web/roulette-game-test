import RedSvg from "./ui/RedSvg";
import BlackSvg from "./ui/BlackSvg";
import GreenSvg from "./ui/GreenSvg";
import JockerSvg from "./ui/JockerSvg";
export default function RecentRolls() {
  return (
    <div className="flex items-center justify-start">
      <RedSvg width={32} height="auto" />
      <BlackSvg width={32} height="auto" />
      <GreenSvg width={32} height="auto" />
      <JockerSvg color="var(--dark-4)" width={32} height={32} />
      <RedSvg width={32} height="auto" />
      <BlackSvg width={32} height="auto" />
      <GreenSvg width={32} height="auto" />
      <JockerSvg color="var(--fishka-red)" width={32} height={32} />
    </div>
  );
}
