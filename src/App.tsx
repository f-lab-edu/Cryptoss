import CurrencySwitch from "./shared/components/common/currency-switch";
import Logo from "./shared/components/common/logo";
import Title from "./shared/components/common/title";
import { DOLLAR, WON } from "./shared/lib/constants";

function App() {
  return (
    <>
      <Logo />
      <Title title="실시간 차트" />
      <CurrencySwitch leftText={DOLLAR} rightText={WON} />
    </>
  );
}

export default App;
