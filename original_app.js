
let overlay = document.getElementById("overlay");
let cd = document.getElementById("cd");
let popupHolder = document.getElementById("popupHolder");
let new_body = document.getElementById("new_body");

let join1 = document.getElementById("join1");
let join2 = document.getElementById("join2");
let join3 = document.getElementById("join3");
let join4 = document.getElementById("join4");
let join5 = document.getElementById("join5");
let x_mobile = document.getElementById("x_mobile");

let close = document.getElementById("close");
let cross = document.getElementById("x-container");

let popup = document.getElementById("popup");

let popup_join_btn = document.getElementById("popup_join_btn");

join1.addEventListener("click", open_about);
join2.addEventListener("click", open_about);
join3.addEventListener("click", open_about);
join4.addEventListener("click", open_about);
join5.addEventListener("click", open_about);

close.addEventListener("click", close_about);
overlay.addEventListener("click", close_about);
x_mobile.addEventListener("click", close_about);


function open_about() {

    overlay.classList.add("show");
    popupHolder.classList.add("show");
    cross.classList.add("show");
    popup_join_btn.classList.add("show");

    overlay.addEventListener("mousemove", move_opoup);

   
    popup.addEventListener("mousemove", move_opoup);

};


function move_opoup(e) {

     var x = event.pageX - $('#overlay').offset().left;
      var y = event.pageY - $('#overlay').offset().top;

      if (window.innerWidth > 1200) {
         $("#popup").css({"transform": "translate3d( " + -x * 0.1 + "px, " + -y * 0.1 + "px, 0px)"});
      }
};



function close_about() {
    overlay.classList.remove("show");
    popupHolder.classList.remove("show");
    cross.classList.remove("show");
     popup_join_btn.classList.remove("show");

    overlay.removeEventListener("mousemove", move_opoup);
    popup.removeEventListener("mousemove", move_opoup);
   
}

// bear model 3d



 let scene, camera, renderer, sphereCamera, bear, statue , skate, videoDOM, blackHole, playBtn;

/*
const _VS  = `

void main() {
     gl_Position = projectionMatrix * mvPosition;
}

`;

const _FS  = `

uniform sampler2D uVideo;

void main() {
    vec4 video = texture2D(uVideo, vUv);

    gl_ragColor = video;
}




`;

*/

let loader = document.getElementById("loader");
let body = document.querySelector(".main-content");

let nfts = document.querySelector(".nfts");
    
 let bearContainer = document.getElementById('bear-holder');
      
      function init() {

        const loadingManager = new THREE.LoadingManager(

            //loaded
            () =>{
                //console.log("loaded 3d");
                clearLoader();
                const t = $(new_body).scrollTop();
                camera.position.y = t * -0.004;
               
                render();

            },

            //progress
            (itemUrl, itemsLoaded, itemsTotal ) =>{
                //console.log(itemsLoaded / itemsTotal);
            }
            );



        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,0.1,50);
        camera.position.set( 0, 0, 5 );

        renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
        renderer.setClearColor( 0xffffff, 0 );
        renderer.autoClear = false;

        renderer.setSize(window.innerWidth, window.innerHeight);

        bearContainer.appendChild(renderer.domElement);

        //let controls = new THREE.OrbitControls(camera, renderer.domElement);
        //controls.enableZoom = false;

        sphereCamera = new THREE.CubeCamera(1,9000000000000,500);

        sphereCamera.position.set(0,0,0);
        scene.add(sphereCamera);
       
        let bearMaterial = new THREE.MeshPhongMaterial({
             envMap: sphereCamera.renderTarget.texture
        });

        const loaderb = new THREE.OBJLoader(loadingManager);

        loaderb.load(
          // resource URL
          'models/neww.obj',
          // called when resource is loaded
          function ( object ) {

             object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {
                    child.material = bearMaterial;
                    child.material.flatShading = false;
                    bear = object;
                }
              });

            scene.add( object );


             if (window.innerWidth < 420) {
                    object.position.y = -36;
                    object.scale.set(0.7, 0.7, 0.7);
             }

               else if (window.innerWidth < 770) {
                     object.position.y = -32.2;
                     object.scale.set(0.8, 0.8, 0.8);
                     

               }

              else if (window.innerWidth < 1050) {
                     object.position.y = -19.85;
                     object.scale.set(0.8, 0.8, 0.8);
              }

              else if (window.innerWidth < 1500) {
                      object.position.y = -36;
                      object.scale.set(1.3, 1.3, 1.3);
             }

             else if (window.innerWidth < 1550) {
                      object.position.y = -36;
                      object.scale.set(1.3, 1.3, 1.3);
             }


             else {
                    object.scale.set(1.3, 1.3, 1.3);
                    object.position.y = -32.1;
             }

            },
        
            function ( xhr ) {
                //console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
               // console.log( 'An error happened' );
            }
        );



        const loaderC = new THREE.OBJLoader(loadingManager);

        loaderC.load(
          // resource URL
          'models/Collector.obj',
          // called when resource is loaded
          function ( object2 ) {

             object2.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {
                     child.material = bearMaterial;
                    child.material.flatShading = false;

                    statue = object2;
                    
                }
              });

            scene.add( object2 );

            // object2.position.y = -17.9;

             if (window.innerWidth < 420) {
                   object2.position.y = -22.4;
                   object2.scale.set(1.9, 1.9, 1.9);
             }

              else if (window.innerWidth < 770) {
                    object2.position.y = -19.3;
                    object2.scale.set(1.8, 1.8, 1.8);
              }

             else if (window.innerWidth < 1050) {
                    object2.position.y = -14.2;
                    object2.scale.set(1.7, 1.7, 1.7);
             }

              else if (window.innerWidth < 1500) {
                    object2.position.y = -24.2;
                    object2.scale.set(2.3, 2.3, 2.3);
            }

             else if (window.innerWidth < 1550) {
                    object2.position.y = -24.5;
                    object2.scale.set(2.3, 2.3, 2.3);
            }


             else {
                    object2.position.y = -22.2;
                    object2.scale.set(2.2, 2.2, 2.2);
             }
            // object2.position.x= ;
            
             //object2.position.z = 1.8;

            },
        
            function ( xhr ) {
               // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
               // console.log( 'An error happened' );
            }
        );

        const loaderS = new THREE.OBJLoader(loadingManager);

        loaderS.load(
          // resource URL
          'models/Skate.obj',
          // called when resource is loaded
          function ( object3 ) {

             object3.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {
                     child.material = bearMaterial;
                    child.material.flatShading = false;

                    skate = object3;
                    
                }
              });

            scene.add( object3 );

            

              if (window.innerWidth < 420) {
                    object3.position.y = -3.38;
                    object3.position.x = 1.6;
                    object3.scale.set(1.3, 1.3, 1.3);
             }

              else if (window.innerWidth < 770) {
                    object3.position.y = -2.3;
                    object3.position.x = 1;
                    object3.scale.set(1.2, 1.2, 1.2);
            
            }

             else if (window.innerWidth < 1050) {
                    object3.position.y = -1.3;
                    object3.position.x = 1;
                    object3.scale.set(1, 1, 1);
             }

              else if (window.innerWidth < 1500) {
                     object3.position.y = -3.8;
                    object3.position.x = 0;
                    object3.scale.set(1.3, 1.3, 1.3);
            }

             else if (window.innerWidth < 1550) {
                     object3.position.y = -3.7;
                     object3.position.x = 0;
                     object3.scale.set(1.3, 1.3, 1.3);
            }

             else {
                 object3.position.y = -3.5;
                 object3.position.x = 0;
                 object3.scale.set(1.3, 1.3, 1.3);
             }
             //object2.position.z = 1.8;

            },
        
            function ( xhr ) {
               // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
               // console.log( 'An error happened' );
            }
        );

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        const noiz = document.getElementById("noise");


        window.addEventListener('resize', () =>
            {
            // Update sizes
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            // Update camera
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            // Update renderer
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


             //noiz.width =  sizes.width;
             //noiz.height =  sizes.height;
        })

       

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);


        const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
        scene.add( ambientLight );

         //console.log(video);


        let materialArray = [];
        let texture_ft = new THREE.TextureLoader().load( 'models/C.jpg');
        let texture_bk = new THREE.TextureLoader().load( 'models/C.jpg');
        let texture_up = new THREE.TextureLoader().load( 'models/C.jpg');
        let texture_dn = new THREE.TextureLoader().load( 'models/C.jpg');
        let texture_rt = new THREE.TextureLoader().load( 'models/C.jpg');
        let texture_lf = new THREE.TextureLoader().load( 'models/C.jpg');
            
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
        materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
             
        for (let i = 0; i < 6; i++)
            materialArray[i].side = THREE.BackSide;
                 
        let skyboxGeo = new  THREE.SphereGeometry( 9000000000000, 62, 62 );
             
        let skybox = new THREE.Mesh( skyboxGeo, materialArray );
        scene.add( skybox );

      
    }

    function moveCamera() {

        const t = $(new_body).scrollTop();

      //  

      if (window.innerWidth < 450 ) {
          camera.position.y = t * -0.006;
           
      }

      else if (window.innerWidth < 770) {
             camera.position.y = t * -0.004;
            
      }

      else if (window.innerWidth < 1050) {
            camera.position.y = t * -0.003;  
      }

    
       else if (window.innerWidth < 1500) {
            camera.position.y = t * -0.005;
            
      }

      else if (window.innerWidth < 1550) {
            camera.position.y = t * -0.005;
         
      }

      else {
            camera.position.y = t * -0.004;
        
      }

    
           
       // blackHole.position.y =   t * 0.004;

    }

    

    function render() {
        renderer.render(scene,camera);
        sphereCamera.update(renderer,scene);

        new_body.onscroll = moveCamera;

        requestAnimationFrame(render);

            bear.rotation.x += 0.02;
            statue.rotation.y += 0.02;
            skate.rotation.x += -0.02;
    }


init();



  const logo_loader = document.getElementById("logo_loader");


        setTimeout(function(){ 
           logo_loader.classList.add("show"); 
         }, 500);

            $(document).ready(function() {
              var formFields = $('.form-field');

              formFields.each(function() {
                var field = $(this);
                var input = field.find('input');
                var label = field.find('label');
                
                function checkInput() {
                  var valueLength = input.val().length;
                  
                  if (valueLength > 0 ) {
                    label.addClass('freeze')
                  } else {
                        label.removeClass('freeze')
                  }
                }
                
                input.change(function() {
                  checkInput()
                })
              });
            });




//form validation


let name_content = "";
let email_content = "";
let link_content = "";

let isNameValid = false;
let isEmailValid = false;

let thanks_msg = document.getElementById("thanks_msg")




function submit_handle(){

    validate_name();
    validate_email();
    popup_anim_5.classList.remove("typing");
    popup_anim_4.classList.remove("typing");
    popup_anim_3.classList.remove("typing");

    validation.classList.add("click");

    if (isNameValid === true && isEmailValid === true) {
       
        thanks_msg.classList.add("subscribed");
        close_about();

        name_content = "";
        email_content = "";

        setTimeout(function(){
            isNameValid = false;
            isEmailValid = false;
        } , 3000);
    }





   setTimeout(function(){
         validation.classList.remove("click");
}, 1000);//wait 2 seconds

}


function validate_name() {
    if (name_content === "") {
          popup_anim_3.classList.remove("typing");
          popup_anim_3.classList.add("error");
          label_name.classList.add("error");
    }

    else {
           popup_anim_3.classList.remove("typing");
           popup_anim_3.classList.remove("error");
           label_name.classList.remove("error");
           isNameValid = true;

    }
}

function validate_email(){
     if (email_content === "" || email_content.indexOf('@')<=0) {
          popup_anim_4.classList.remove("typing");
          popup_anim_4.classList.add("error");
          label_email.classList.add("error");
        
    }

     else {
           popup_anim_4.classList.remove("typing");
           popup_anim_4.classList.remove("error");
           label_email.classList.remove("error");
           isEmailValid = true;

    }
}


let validation = document.getElementById("validation");
validation.addEventListener("click", submit_handle);

let name = document.getElementById("mce-FNAME");
let last_name = document.getElementById("mce-EMAIL");
let link = document.getElementById("link");

name.addEventListener("keyup", typing_name);
last_name.addEventListener("keyup", typing_email);
link.addEventListener("keyup", typing_link);

let popup_anim_3 = document.querySelector(".popup_anim_3");
let popup_anim_4 = document.querySelector(".popup_anim_4");
let popup_anim_5 = document.querySelector(".popup_anim_5");

let label_name = document.querySelector(".label_name");
let label_email = document.querySelector(".label_email");




function typing_name(e) {

event.preventDefault()
   popup_anim_3.classList.add("typing");
    popup_anim_3.classList.remove("error");
      label_name.classList.remove("error");

     if (e.target.value.length === 0) {
           popup_anim_3.classList.remove("typing");
    }

    name_content = e.target.value;


}

function typing_email(e) {

    popup_anim_4.classList.add("typing");
     popup_anim_4.classList.remove("error");
     label_email.classList.remove("error");

     if (e.target.value.length === 0) {
           popup_anim_4.classList.remove("typing");
    }

      email_content = e.target.value;

}

function typing_link(e) {

    popup_anim_5.classList.add("typing");
    link_content = e.target.value;

     if (e.target.value.length === 0) {
        popup_anim_5.classList.remove("typing");
    }

}








const slider = document.querySelector(".nft-corousel-holder");

const nft_corousel_2 = document.querySelector(".nft-corousel");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", e => {
  isDown = true;
 //slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  //slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
    nft_corousel_2.style.pointerEvents= "all";
  isDown = false;
 // slider.classList.remove("active");
});
slider.addEventListener("mousemove", e => {
   

  if (!isDown) return;
   nft_corousel_2.style.pointerEvents= "none";
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
});


 window.onload = function loadingFunction() {
       
           clearLoader();
}


let navigation = document.querySelector(".navigation");
let nft_text = document.querySelector(".nft-text");

let nft_corousel = document.querySelector(".nft-corousel-holder");

let nft_video_3 = document.getElementById("falling");
let nft_johana = document.getElementById("johana");
let nft_ritual = document.getElementById("ritual");
let nft_biancabeers = document.getElementById("biancabeers");
let nft_joe_ryba = document.getElementById("joe_ryba");



function clearLoader() {

        loader.classList.remove("show");
        setTimeout(function(){
        nfts.classList.add("show");
        navigation.classList.add("show");
        nft_text.classList.add("show");

        }, 200);//wait 2 seconds
       
        body.classList.remove("nonscrollable"); 
        //console.log("loaded other"); 

        setTimeout(function(){
              animationSecond.playSegments(true);
         }, 2600);

         setTimeout(function(){
            new_body.classList.add("scroll");
            //nft_ritual.src = "images/nfts/nft_6.mp4";
            //nft_johana.src = "images/nfts/nft_3.mp4";
            //nft_video_3.src = "images/nfts/nft_2.mp4";

            nft_ritual.src = "images/nfts/nft_6.mp4";
            nft_video_3.src = "images/nfts/nft_2.mp4"
            nft_johana.src= "images/nfts/nft_3.mp4";
            nft_biancabeers.src= "images/nfts/nft_8.mp4";
            nft_joe_ryba.src = "images/nfts/nft10.mp4";

           
         }, 2800);


        if (window.innerWidth < 550) {
            
             setTimeout(function(){

                nft_corousel.classList.add("phone_scrollable");
               
             }, 2800);

        }
        
}


/*
var xhr = new XMLHttpRequest();
xhr.open('GET', 'images/nfts/nft_6.mp4', true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  if (this.status == 200) {
    var myBlob = this.response;
    var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);
    // myBlob is now the blob that the object URL pointed to.
    nft_ritual.src = vid;
    // not needed if autoplay is set for the video element
     nft_ritual.play()
   }
  }
xhr.send();



var xhr2 = new XMLHttpRequest();
xhr2.open('GET', 'images/nfts/nft_2.mp4', true);
xhr2.responseType = 'blob';
xhr2.onload = function(e) {
  if (this.status == 200) {
    var myBlob = this.response;
    var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);
    // myBlob is now the blob that the object URL pointed to.
    nft_video_3.src = vid;
    // not needed if autoplay is set for the video element
     nft_video_3.play()
   }
  }
xhr2.send();



var xhr3 = new XMLHttpRequest();
xhr3.open('GET', 'images/nfts/nft_3.mp4', true);
xhr3.responseType = 'blob';
xhr3.onload = function(e) {
  if (this.status == 200) {
    var myBlob = this.response;
    var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);
    // myBlob is now the blob that the object URL pointed to.
   
    nft_johana.src = vid;
    // not needed if autoplay is set for the video element
     nft_johana.play()
   }
  }
xhr3.send();



var xhr4 = new XMLHttpRequest();
xhr4.open('GET', 'images/nfts/nft_8.mp4', true);
xhr4.responseType = 'blob';
xhr4.onload = function(e) {
  if (this.status == 200) {
    var myBlob = this.response;
    var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);
    // myBlob is now the blob that the object URL pointed to.
    nft_biancabeers.src = vid;
    // not needed if autoplay is set for the video element
     nft_biancabeers.play()
   }
  }
xhr4.send();


var xhr5 = new XMLHttpRequest();
xhr5.open('GET', 'images/nfts/nft10.mp4', true);
xhr5.responseType = 'blob';
xhr5.onload = function(e) {
  if (this.status == 200) {
    var myBlob = this.response;
    var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);
    // myBlob is now the blob that the object URL pointed to.
   
    nft_joe_ryba.src = vid;
    // not needed if autoplay is set for the video element
     nft_joe_ryba.play()
   }
  }
xhr5.send();
*/



function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height() / 3;

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}



var scroll_animation_desktop = function(event){

        
    $('.entry__animation__desktop').each(function () {
        if (isScrolledIntoView(this) === true) {
            $(this).addClass('show');
        }
    });

}

var scroll_animation_mobile = function(event){

        
    $('.entry__animation__mobile').each(function () {
        if (isScrolledIntoView(this) === true) {
            $(this).addClass('show');
        }
    });

}


    //$(window).scroll(scroll_animation_desktop);
    //$("#new_body").scroll(scroll_animation);


/*

(function($) {


  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);










var scroll_animation = function(event){

   

    if (window.innerWidth > 770) {

         $('.h1-span-1').each(function(i, el) {
            var el = $(el);
                if (el.visible(true)) {
                     el.addClass("show"); 
                } 
            });

            $('.h1-span-2').each(function(i, el) {
            var el = $(el);
                if (el.visible(true)) {
                     el.addClass("show"); 
                } 
            });

            $('.h1-span-3').each(function(i, el) {
            var el = $(el);
                if (el.visible(true)) {
                     el.addClass("show"); 
                } 
            });

           $('.h1-span-4').each(function(i, el) {
            var el = $(el);
                if (el.visible(true)) {
                     el.addClass("show"); 
                } 
            });

            $('.h1-span-5').each(function(i, el) {
            var el = $(el);
                if (el.visible(true)) {
                     el.addClass("show"); 
                } 
            });


             $('.c_t_p_1').each(function(i, el) {
                var el = $(el);
                    if (el.visible(true)) {
                         el.addClass("show"); 
                    } 
                });

               $('.c_t_p_2').each(function(i, el) {
                var el = $(el);
                    if (el.visible(true)) {
                         el.addClass("show"); 
                    } 
                });


             $('.c_t_p_3').each(function(i, el) {
                var el = $(el);
                    if (el.visible(true)) {
                         el.addClass("show"); 
                    } 
                });


             $('.c_t_p_4').each(function(i, el) {
                var el = $(el);
                    if (el.visible(true)) {
                         el.addClass("show"); 
                    } 
                });


             $('.c_t_p_5').each(function(i, el) {
                var el = $(el);
                    if (el.visible(true)) {
                         el.addClass("show"); 
                    } 
                });

               $('.r_s_1').each(function(i, el) {
                var el = $(el);
                    if (el.visible(true)) {
                         el.addClass("show"); 
                    } 
                });

              $('.r_s_2').each(function(i, el) {
                var el = $(el);
                    if (el.visible(true)) {
                         el.addClass("show"); 
                    } 
                });

              $('.r_s_3').each(function(i, el) {
                var el = $(el);
                    if (el.visible(true)) {
                         el.addClass("show"); 
                    } 
                });

              $('.r_s_4').each(function(i, el) {
                var el = $(el);
                    if (el.visible(true)) {
                         el.addClass("show"); 
                    } 
                });



            }














            else if(window.innerWidth < 770) {


                $('.h2-span-1').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.h2-span-2').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.h2-span-3').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.h2-span-4').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.h2-span-5').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.h2-span-6').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.h2-span-7').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.h2-span-8').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.h2-span-9').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });


                $('.m_t_p_1').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.m_t_p_2').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                 $('.m_t_p_3').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                  $('.m_t_p_4').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

               $('.m_t_p_5').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.m_t_p_6').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                 $('.m_t_p_7').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.m_t_p_8').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });


                 $('.m_t_p_9').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.m_t_p_10').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });


                $('.m_s_1').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                $('.m_s_2').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                 $('.m_s_3').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                 $('.m_s_4').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                 $('.m_s_5').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                 $('.m_s_6').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

                 $('.m_s_7').each(function(i, el) {
                    var el = $(el);
                        if (el.visible(true)) {
                             el.addClass("show"); 
                        } 
                });

             }








    $('.h1-span-6').each(function(i, el) {
        var el = $(el);
        if (el.visible(true)) {
             el.addClass("show"); 
        } 
    });


    $('#join-btn-animation-1').each(function(i, el) {
    var el = $(el);
        if (el.visible(true)) {
             el.addClass("show"); 
        } 
    });

    $('.marketplace-title').each(function(i, el) {
    var el = $(el);
        if (el.visible(true)) {
             el.addClass("show"); 
        } 
    });

    $('.marketplaces').each(function(i, el) {
    var el = $(el);
        if (el.visible(true)) {
             el.addClass("show"); 
        } 
    });

    $('.marketplace-quote').each(function(i, el) {
        var el = $(el);
            if (el.visible(true)) {
                 el.addClass("show"); 
            } 
        });

     $('.collectors-title-container').each(function(i, el) {
        var el = $(el);
            if (el.visible(true)) {
                 el.addClass("show"); 
            } 
        });

     

     $('.from-c-to-c').each(function(i, el) {
        var el = $(el);
            if (el.visible(true)) {
                 el.addClass("show"); 
            } 
        });



      $('.r_s_5').each(function(i, el) {
        var el = $(el);
            if (el.visible(true)) {
                 el.addClass("show"); 
            } 
        });

      $('#join-btn-animation-2').each(function(i, el) {
        var el = $(el);
            if (el.visible(true)) {
                 el.addClass("show"); 
            } 
        });


       $('.collectors-holder').each(function(i, el) {
        var el = $(el);
            if (el.visible(true)) {
                 el.addClass("show"); 
            } 

     });

       $('.rabbit-hole-content').each(function(i, el) {
        var el = $(el);
            if (el.visible(true)) {
                 el.addClass("show"); 
            } 

     });

       

       $('.main_footer').each(function(i, el) {
        var el = $(el);
            if (el.visible(true)) {
                 el.addClass("show"); 
                  $("#new_body").unbind("scroll", scroll_animation);
                  $('.home-app').css({"will-change": "unset"});
                  $('.bookmark-app').css({"will-change": "unset"});
                  $('.danger_sticker').css({"will-change": "unset"});
                  $('.rift_sticker').css({"will-change": "unset"});
                  $('.heart_sticker').css({"will-change": "unset"});
                  $('.fire_sticker').css({"will-change": "unset"});
            } 
     });

};




*/

function input_handler_mobile() {

    let pop_up_scroll = document.querySelector(".pop_up_scroll");
    let popup_content  = document.querySelector(".popup-content");

    if (window.innerWidth < 550) {

        pop_up_scroll.addEventListener("scroll",function(e){
             let s = $(pop_up_scroll).scrollTop(); 
            
             if (s > 5) {
                popup.classList.add("mobile_scrolling");
             }

             else {
                popup.classList.remove("mobile_scrolling");
             }
        });

    }
}

input_handler_mobile();

//$("#new_body").scroll(scroll_animation);


let corner_left = document.getElementById("corner_left");
let corner_right = document.getElementById("corner_right");

function checkDevice() {
        //var is_OSX = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
        var is_iOS = /(iPhone|iPod|iPad)/i.test(navigator.platform);
        
        var is_Mac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        var is_iPhone = navigator.platform === "iPhone";
        var is_iPod = navigator.platform === "iPod";
        var is_iPad = navigator.platform === "iPad";

        if (is_Mac /*|| is_iOS || is_iPhone || is_iPod || is_iPad*/) {
            corner_left.style.display = "block";
            corner_right.style.display = "block";
        }
        else {
            corner_left.style.display = "none";
            corner_right.style.display = "none";
    } 

     }

checkDevice();





import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

var container2 = document.getElementById('logo_loader');
var state = 'play';

var animation = lottieWeb.loadAnimation({
  container: container2,
  path: 'logo/data.json',
  renderer: 'svg',
  loop: true,
  autoplay: true,
  name: "Demo Animation",
});

    if (window.innerWidth > 770) {
         $("#new_body").scroll(scroll_animation_desktop);
    }

    else if(window.innerWidth < 770) { 
          $("#new_body").scroll(scroll_animation_mobile);
    }





var container = document.getElementById('logo_navigation');
var state = 'play';

var animationSecond = lottieWeb.loadAnimation({
  container: container,
  path: 'logo_menu/data.json',
  renderer: 'svg',
  loop: false,
  autoplay: false,
  name: "Demo Animation",
});




/*
animationSecond.goToAndStop(10, true);


var favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');

console.log(favicon.href)

var iterations360 = 0;
var interval360;

function rotateIt() {
  if (iterations360 < 90) {
       iterations360++;
       favicon.href = 'images/favicon/0' + iterations360 +'.png';
        console.log("rotiram se");
       
  }

  else {
     iterations360 = 0;
     clearInterval(interval360);
     console.log("novi");
     playMe();
  }
              
}

function playMe() {
    interval360 = setInterval(rotateIt,35);
}
setTimeout(function(){
    playMe();
}, 3000);
*/

























