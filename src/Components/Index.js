
import BodyIndex from './BodyIndex';
import FooterIndex from './FooterIndex';
import Header from './Header';

function Index() {
  return (
    <div>
      <Header
      texto1="Bienvenido a"
      texto2="Adoptme"
      />
      <BodyIndex></BodyIndex>
      <FooterIndex></FooterIndex>
    </div>
    

  );
}

export default Index;