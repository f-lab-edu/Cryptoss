function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <img
        src="src/assets/cryptoss-logo.png"
        alt="logo pic"
        width={"32px"}
        height={"32px"}
      />
      <p className="font-bold text-white">크립토스</p>
    </div>
  );
}

export default Logo;
