import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import gif from '../../assets/images/giphy.gif';
import man from '../../assets/images/man.png';
import { studyLevels } from '../../utils/constants';
import { Wave } from '../../components/Wave/Wave';
import { scrollListenerAndCleanUp, showElement } from '../../utils/helper';

export const Landing = () => {
  let paragraphRef = useRef<HTMLParagraphElement>(null);
  let imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    function showHero() {
      setTimeout(() => {
        showElement(paragraphRef.current!);
      }, 200);
      setTimeout(() => {
        showElement(imageRef.current!, imageRef.current?.height);
      }, 200);
    }

    showHero();
    return scrollListenerAndCleanUp(showHero);
  }, []);

  return (
    <div className="landing">
      <div className="seo">
        <h1>
          منصة محمد فتحى
          <img src={gif} alt="electric" />
        </h1>
        <h1>
          محمد فتحى
          <img src={gif} alt="electric" />
        </h1>
        <h1>
          فيزيا محمد فتحى
          <img src={gif} alt="electric" />
        </h1>
      </div>
      <div className="hero">
        <div className="container">
          <div className="text">
            <h1>
              منصة المهندس محمد فتحى
              <img src={gif} alt="electric" />
            </h1>
            <div className="hero-buttons">
              <a href="#courses-buttons">جميع الكورسات</a>
              <Link to="courses?mine=1">كورساتى</Link>
            </div>

            {/* <p ref={paragraphRef} className="hidden">
              انا المهندس محمد فتحي بشرح مادة الفيزياء للمرحلة الثانوية بطريقة
              جديدة وفكاهية وبسيطه وفي فيديوهات مدتها قصيرة لا تتعدي 20 دقيقة
              بحيث تطلع من الفيديو باكبر فايدة واقل وقت اتمني ليك مشاهدة ممتعة
              ومفيدة واني اكون سهلت عليك المادة .
            </p> */}
          </div>
          <div className="image">
            <div className="image-warpper">
              <img ref={imageRef} src={man} className="hidden" alt="man" />
            </div>
          </div>
        </div>
      </div>
      <Wave />
      <div id="courses-buttons" className="courses-buttons">
        <div className="container">
          <h1>المحاضرات</h1>
          <div className="buttons">
            {studyLevels.map((level) => (
              <Link to={`/courses?level=${level}`}>{level}</Link>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="instructions-video">
        <div className="color-overlay"></div>
        <div className="container">
          <h1>شرح طريقة استخدام المنصة</h1>
          <iframe
            src="https://www.youtube.com/embed/61QSHrOuGEA"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div> */}
    </div>
  );
};
