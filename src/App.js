// "./3dmob/aguardian90_8.fbx"
import React, { Component } from 'react';

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import $ from 'jquery';


$(document).ready(function(){

let scene, camera, renderer, controls;

let clock, skeleton;
let actions = [];
let action_1, action_2, action_3, action_4, action_5;
let currentAction, newAction;

const mixers = [];
let mixer;
window.NAME_FILE = "aguardian90_8.fbx";
window.ROTATION_X = 1.6;


// import Stats from 'three/examples/jsm/libs/stats.module'


window.THREE = THREE; 
window.OrbitControls = OrbitControls;
window.FBXLoader = FBXLoader;
window.init = function () {
    init();
}

function init () {

    clock = new window['THREE'].Clock();

    scene = new window['THREE'].Scene();

    //Camera setup
    camera = new window['THREE'].PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1,1000);
    camera.position.set(50,100,-200);

    renderer = new window['THREE'].WebGLRenderer({ antialias:true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = window['THREE'].PCFSoftShadowMap;
    renderer.outputEncoding = window['THREE'].sRGBEncoding;
    renderer.setAnimationLoop( animation );

    controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new window['THREE'].Vector3(0, 1, 0);
    controls.enableDamping = true;
    controls.maxPolarAngle = (Math.PI * 0.5) + 0.01; // limit vertical
    controls.minDistance = 2;
    controls.maxDistance = 1000;

    let threejs_canvas = document.getElementById("threejs-canvas")
    threejs_canvas.appendChild(renderer.domElement)


    // Grid Helper Plane

    // const gridHelper = new window['THREE'].GridHelper(5, 5, 0x080808, 0x080808);
    // scene.add(gridHelper);


    // Directional Light

    const directional_light = new window['THREE'].DirectionalLight( 0xffffff, 0.7 );
    directional_light.position.set( 2, 6, -2 );
    directional_light.castShadow = true;
    directional_light.shadow.camera.near = 0.1;
    directional_light.shadow.camera.far = 10;
    directional_light.shadow.mapSize.width = 2048;
    directional_light.shadow.mapSize.height = 2048;
    scene.add( directional_light );


    // Hemisphere Light

    const hemisphere_light = new window['THREE'].HemisphereLight( 0xffffff, 0x000000, 0.4 );
    hemisphere_light.position.set( -4, 6, 8 );
    scene.add( hemisphere_light );


    // Hemisphere Light

    const hemisphere_light_2 = new window['THREE'].HemisphereLight( 0xffffff, 0x000000, 0.4 );
    hemisphere_light_2.position.set( -6, 2, -8 );
    scene.add( hemisphere_light_2 );

    // Ground Plane

    // const ground_mesh = new window['THREE'].Mesh(ground_geometry, shadow_material);
    const ground_mesh = new window['THREE'].Mesh(                                      
        new window['THREE'].PlaneGeometry(100, 100, 1, 1),
        new window['THREE'].MeshLambertMaterial({ 
        color: 0x000
    }));

    ground_mesh.receiveShadow = true;

    ground_mesh.rotateX(-Math.PI / 2);
    scene.add(ground_mesh);


    // Load GLTF

    const fbx_loader = new FBXLoader();

    fbx_loader.load( 

        `./3dmob/${window["NAME_FILE"]}`, function ( fbx ) {

            console.log( "Robot model with idle animation loaded" );

            const model = fbx;
            model.rotation.y = Math.PI;
            mixer = new window['THREE'].AnimationMixer( model );
            mixers.push( mixer );

            fbx.traverse((node) => {  
                if (node.isMesh) node.frustumCulled = false;
                if (node.isMesh) node.castShadow = true;

                if (node.isMesh) node.material.transparent = false;
                if (node.isMesh) node.material.alphaTest = 0.5;
            });

            action_1 = mixer.clipAction( fbx.animations[0]);
            actions.push(action_1);
            action_1.play();
            currentAction = mixer.clipAction(fbx.animations[0]);

            skeleton = new window['THREE'].SkeletonHelper( model );
            skeleton.visible = false;

            scene.add( skeleton );
            scene.add(model);
            
            // fbx.rotation.x += 1.6 //
            // fbx.rotation.x += 0 
            fbx.rotation.x += window["ROTATION_X"] //guild
            load_animations();

        }, 
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'Error loading file 0' );
        }   

    ); 


function load_animations() {
    
    let name_object =  window["NAME_FILE"].split(".fbx");

    // animation 2 attackout
    fbx_loader.load( `./3dmob_bone/${name_object[0].split("_")[1]}_attackout.fbx`, function ( fbx ) {                    
            action_2 = mixer.clipAction(fbx.animations[0]);
            actions.push(action_2);
            fbx.children[0].rotation.x += 4.7;
            
        }, 
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {

            document.getElementById("animation-2").style.display = "none";
            
            console.log( 'Error loading file attackout' );
        }   
    );
    
    // animation 3 damageout
    fbx_loader.load( `./3dmob_bone/${name_object[0].split("_")[1]}_damageout.fbx`, function ( fbx ) {                    
            action_3 = mixer.clipAction(fbx.animations[0]);
            actions.push(action_3);
            fbx.children[0].rotation.x += 4.7;
            
        }, 
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {

            document.getElementById("animation-3").style.display = "none";

            console.log( 'Error loading file damageout' );
        }   
    );
    
    // animation 4 deadout
    fbx_loader.load( `./3dmob_bone/${name_object[0].split("_")[1]}_deadout.fbx`, function ( fbx ) {                    
            action_4 = mixer.clipAction(fbx.animations[0]);
            actions.push(action_4);
            fbx.children[0].rotation.x += 4.7;
            
        }, 
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {

            document.getElementById("animation-4").style.display = "none";

            console.log( 'Error loading file deadout' );
        }   
    );
    

    // animation 5 moveout
    fbx_loader.load( `./3dmob_bone/${name_object[0].split("_")[1]}_moveout.fbx`, function ( fbx ) {                    
            action_5 = mixer.clipAction(fbx.animations[0]);
            actions.push(action_5);
            fbx.children[0].rotation.x += 4.7;
            
        }, 
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {

            document.getElementById("animation-5").style.display = "none";

            console.log( 'Error loading file moveout' );
        }   
    );
    
    ui_timer();
    document.body.removeAttribute("loading");
    document.body.setAttribute("loaded","");

    }

    activateAllActions();

}


function animation(time) {

    const delta = clock.getDelta();
    for ( const mixer of mixers ) mixer.update( delta );

    controls.update();
    renderer.render(scene, camera);
    
}


function activateAllActions() {

    actions.forEach( function ( action ) {
        action.play();
    } );

}

window.switchAction = function () {
    switchAction();
}

function switchAction () {

    if (newAction !== currentAction) {

        currentAction.fadeOut(0.3);
        newAction.reset();
        newAction.setEffectiveWeight( 1 );
        newAction.play();
        newAction.fadeIn(0.3);
        currentAction = newAction;
    }
}

// Toggle Skeleton

const skeleton_button = document.getElementById("skeleton-button");
skeleton_button.addEventListener("click", function (e) {
    if (skeleton.visible === false) {
        skeleton.visible = true;
    }

    else {
        skeleton.visible = false;
    }
});


// Animation Speed Slider

const animation_speed_slider = document.getElementById("animation-speed-slider");
update_slider()

animation_speed_slider.addEventListener("input", function (e) {
    update_slider();
});


function update_slider() {

    let slider_value = animation_speed_slider.value/100;
    let slider_width = animation_speed_slider.offsetWidth;
    let slider_value_element = document.getElementById("animation-speed-value");
    let slider_track_highlight = document.getElementById("range-slider-1-track-highlight");
    
    slider_track_highlight.style.width = slider_width * slider_value + "px";
    slider_value_element.innerHTML = slider_value;

    for ( const mixer of mixers ) {
        mixer.timeScale = slider_value; 
    }

}


// Animation Buttons

const animation_button_1 = document.getElementById("animation-button-1");
animation_button_1.addEventListener("click", function() {
    newAction = action_1;
    switchAction();
});

const animation_button_2 = document.getElementById("animation-button-2");
animation_button_2.addEventListener("click", function() {
    newAction = action_2;
    switchAction();
});

const animation_button_3 = document.getElementById("animation-button-3");
animation_button_3.addEventListener("click", function() {
    newAction = action_3;
    switchAction();
});

const animation_button_4 = document.getElementById("animation-button-4");
animation_button_4.addEventListener("click", function() {
    newAction = action_4;
    switchAction();
});


const animation_button_5 = document.getElementById("animation-button-5");
animation_button_5.addEventListener("click", function() {
    newAction = action_5;
    switchAction();
});



// Window Resize

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// UI Timer

const ui_timer = function () {

    let time;
    document.onmousemove = resetTimer;
    document.ontouchmove = resetTimer;
    document.onkeydown = resetTimer;

    function timeout() {
        document.body.removeAttribute("ui");
    };

    function resetTimer() {
        clearTimeout(time);
        document.body.setAttribute("ui","");
        time = setTimeout(timeout, 3000);
    };
};



// Fullscreen button

if (document.fullscreenEnabled || document.webkitFullscreenEnabled || 
    document.msFullscreenEnabled ) {
    create_fullscreen_button();
};


function create_fullscreen_button() {

    let fullscreen_button = document.createElement("button");
    fullscreen_button.setAttribute('id','fullscreen-button');
    fullscreen_button.addEventListener("click", toggle_fullscreen);

    fullscreen_button.innerHTML  = `
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    `;

    document.body.appendChild(fullscreen_button);

};


function toggle_fullscreen() {

        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {  
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }

        document.body.setAttribute("fullscreen","");

    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        }

        document.body.removeAttribute("fullscreen") ;

    }
                
};


function check_fullscreen() {

    // (Because users can exit / enter fullscreen via device / browser)

    if (document.fullscreenElement !== null) { 
        document.body.setAttribute("fullscreen","") ;
    }

    else  { 
        document.body.removeAttribute("fullscreen") ;
    }
};

setInterval(function(){ check_fullscreen();}, 1000); 

function api() {

  const json = [
    {
      name_file: "aguardian90_8.fbx",
      rotation_x:  1.6
    },

    {
      name_file: "empelium90_0.fbx",
      rotation_x:  1.6
    },

    {
      name_file: "guildflag90_1.fbx",
      rotation_x:  1.6
    },

    {
      name_file: "kguardian90_7.fbx",
      rotation_x:  1.6
    },
    {
      name_file: "treasurebox_2.fbx",
      rotation_x:  0
    },
  ];

  const select = document.getElementById('object');

    for (var i = 0; i < json.length; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = json[i].name_file;
        opt.setAttribute("data-rotation", json[i].rotation_x);
        opt.classList.add("option_select");

        opt.setAttribute("id", "option_"+ i);

        opt.setAttribute("onclick", "doSomething(this);" );

        select.appendChild(opt);
    }

}

init();
api();

$('#object').change(function(){ 

    var value = $(this).val();

    $('#option_'+value)
    console.log(value, $('#option_'+value).html(), $('#option_'+value).data().rotation );


    document.body.setAttribute("loading","")
    window["NAME_FILE"] = $('#option_'+value).html();
    window["ROTATION_X"] = $('#option_'+value).data().rotation;

    
    document.getElementById("animation-2").style.display = "block";
    document.getElementById("animation-3").style.display = "block";
    document.getElementById("animation-4").style.display = "block";
    document.getElementById("animation-5").style.display = "block";

    document.getElementById("animation-1").checked = true;
    document.getElementById("animation-2").checked = false;
    document.getElementById("animation-3").checked = false;
    document.getElementById("animation-4").checked = false;
    document.getElementById("animation-5").checked = false;

    // remove ultimo canvas
    const element = document.getElementsByTagName("canvas")[0];
    element.remove()
    $( "canvas" ).remove();

    // restart
    init();
});
});
export default class App extends Component {

  render () {
    

    return (
      <div>
    
      </div>
    );
  }
}