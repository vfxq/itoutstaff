import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Button } from '@ui-kit';
import './about.less';

const About: React.FC = () => {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const findTwists = () => {};

  return (
    <div className="about section_block">
      <Row>
        <Col span={14} offset="3">
          <h1>
            {t('about.header1')}
          </h1>
          <div className="prizm_background">
            <h1 className="primary_color">
              {t('about.header2')}
            </h1>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={11} offset="3" className="intro">
          <p className="lead">
            {t('about.descriptionHeader')}
            <br />
            {t('about.description')}
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={3} offset="3">
          <Button
            variant="primary"
            onClick={findTwists}
            size="large"
          >
            {t('findYouTwist')}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default About;
