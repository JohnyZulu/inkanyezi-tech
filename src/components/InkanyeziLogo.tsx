import logo from "@/assets/inkanyezi-logo.svg";

const InkanyeziLogo = ({ className = "" }: { className?: string }) => (
  <img src={logo} alt="Inkanyezi Technologies" className={className} />
);

export default InkanyeziLogo;
