import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {ARButton} from 'three/examples/jsm/webxr/ARButton.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'


class ARExperience {
    constructor() {
    this.container = document.createElement('div');
    
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    )
    this.camera.position.set(5, 5,10);
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer(
        {alpha: true,antialias: true,}
    )
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(1);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true;

/*     //cube
    const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.2),
    new THREE.MeshBasicMaterial({
    color: 0xF800    })
     this.scene.add(mesh)
    ) */
    //lights
        const drLight = new THREE.DirectionalLight(0xffffff, 1)
        drLight.position.set(5,5,5)
        this.scene.add(drLight)

        const drLight2 = new THREE.DirectionalLight(0xffffff, 1)
        drLight2.position.set(-5,5,5)
        this.scene.add(drLight2)


   
    window.addEventListener('resize', this.resize.bind(this))
    }
    
    setupARExperience() {
        this.renderer.xr.enabled = true;

        const controller = this.renderer.xr.getController(0);
        this.scene.add(controller);

        this.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.position.set(0, 0, -10)
                .applyMatrix4(controller.matrixWorld)
                child.quaternion.setFromRotationMatrix(controller.matrixWorld)
            }
        })
   
    this.container.appendChild(
        ARButton.createButton(this.renderer)
    )
    }
    loadModel() {
        const gltfloader = new GLTFLoader();
        gltfloader.load(
            "../../public/textoILOVEYOUweb.glb", (gltf) => {
                this.scene.add(gltf.scene);
            } 
        )
    }

    initScene() {
        console.log('first')
        document
        .querySelector(".container3D")
        .appendChild(this.container);
        this.renderer.setAnimationLoop(this.render.bind(this))
    }


    resize() {
        const {
            clientWidth: width,
            clientHeight: height,
        } = 
         document.querySelector(".container3D")
        this.renderer.setSize(width, height)
        this.camera.updateProjectionMatrix()
        this.camera.aspect = width / height
    }

    render() {
        this.renderer.render(this.scene, this.camera)

    }
    cleanUp() {
        this.renderer.dispose()
        
        const container = document.querySelector(".container3D")
        let child = container.lastElementChild
        while (child) {
            container.removeChild(child)
            child = container.lastElementChild
        }
    }
}

export {ARExperience}