import { useEffect } from 'react';
import {ARExperience} from './Experience';

const ARComponents = () => {
  const arExperience = new ARExperience()
  useEffect(() => {
    arExperience.initScene()
    
    arExperience.setupARExperience()
    arExperience.loadModel()

    return () => {
      arExperience.cleanUp()
    }
  }, []);

  return (
    <div
    className="container3D"
    style = {{width: "100%", height: "100vh"}}
    >
        ARComponents</div>
  )
}

export default ARComponents