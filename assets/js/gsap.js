$(window).on('load', function() {
	var currentImg = undefined,
		currentImgProps = {
		  x: 0,
		  y: 0
		},
		isZooming = false,
		column = -1,
		mouse = {
		  x: 0,
		  y: 0
		},
		delayedPlay,
		boxContainers = [];

	for (var i = 0; i < 12; i++) {
		if (i % 4 === 0) column++;
		var b = document.createElement('div');
		$('.main4Boxes').append(b);
		boxContainers.push(b);

		gsap.set(b, {
		  attr: {
			id: 'b' + i,
			class: 'photoBox pb-col' + column
		  },
		  backgroundImage: 'url(https://greensock.com/images/header/picsum/' + i + '.jpg)',
		  backgroundSize: 'cover',
		  backgroundPosition: 'center',
		  overflow: 'hidden',
		  x: [60, 280, 500][column],
		  width: 400,
		  height: 640,
		  borderRadius: 20,
		  scale: 0.1,
		  zIndex: 1
		});

		b.tl = gsap.timeline({
			paused: true,
			repeat: -1
		  })
		  .fromTo(b, {
			y: [-575, 800, 800][column],
			rotation: -0.05
		  }, {
			duration: [40, 35, 26][column],
			y: [800, -575, -575][column],
			rotation: 0.05,
			ease: 'none'
		  })
		.progress(i % 4 / 4)
	}


	function pauseBoxes(b, all) {
		var classStr = 'pb-col0';
		if ($(b).hasClass('pb-col1')) classStr = 'pb-col1';
		if ($(b).hasClass('pb-col2')) classStr = 'pb-col2';
		for (var i = 0; i < boxContainers.length; i++) {
		  var b = boxContainers[i];
		  if ($(b).hasClass(classStr) || all) gsap.to(b.tl, {
			timeScale: 0,
			ease: 'sine'
		  });
		}
	}

	function playBoxes() {
		for (var i = 0; i < boxContainers.length; i++) {
			var tl = boxContainers[i].tl;
			tl.play();
			gsap.to(tl, {
				duration: 0.4,
				timeScale: 1,
				ease: 'sine.in',
				overwrite: true
			});
		}
	}


	function createImageGalleryAnimation(container, callback) {
		var _tl = gsap.timeline({
			onStart: playBoxes
		  })
		  .set(container, {
			perspective: 800
		  })
		  .set('.photoBox', {
			opacity: 1,
			cursor: 'pointer'
		  })
		  .set('.main4Boxes', {
			left: '75%',
			xPercent: -50,
			width: 1200,
			rotationX: 14,
			rotationY: -15,
			rotationZ: 10
		  })
		  .set('.main4Close', {
			width: 60,
			height: 60,
			right: 15,
			top: 15,
			pointerEvents: 'none'
		  })
		  .fromTo('.main4Close', {
			autoAlpha: 0
		  }, {
			autoAlpha: 0,
			duration: 0.3,
			ease: 'power3.inOut'
		  }, "+=0.5")
		  .fromTo(container, {
			autoAlpha: 0
		  }, {
			duration: 0.6,
			ease: 'power2.inOut',
			autoAlpha: 1
		  }, 0.2)

		$('.photoBox').on('mouseenter', function (e) {
		  if (currentImg) return;
		  if (delayedPlay) delayedPlay.kill();
		  pauseBoxes(e.currentTarget);
		  var _t = e.currentTarget;
		  gsap.to('.photoBox', {
			duration: 0.2,
			overwrite: 'auto',
			opacity: function (i, t) {
			  return (t === _t) ? 1 : 0.33
			}
		  });
		  gsap.fromTo(_t, {
			zIndex: 100
		  }, {
			duration: 0.2,
			scale: 0.62,
			overwrite: 'auto',
			ease: 'power3'
		  });
		});

		$('.photoBox').on('mouseleave', function (e) {
		  if (currentImg) return;
		  var _t = e.currentTarget;

		  if (gsap.getProperty(_t, 'scale') > 0.62) delayedPlay = gsap.delayedCall(0.3, playBoxes); // to avoid jump, add delay when mouseout occurs as big image scales back down (not 100% reliable because the scale value sometimes evaluates too late)
		  else playBoxes();

		  gsap.timeline()
			.set(_t, {
			  zIndex: 1
			})
			.to(_t, {
			  duration: 0.3,
			  scale: 0.5,
			  overwrite: 'auto',
			  ease: 'expo'
			}, 0)
			.to('.photoBox', {
			  duration: 0.5,
			  opacity: 1,
			  ease: 'power2.inOut'
			}, 0);
		});

		$('.photoBox').on('click', function (e) {
		  if (!isZooming) { //only tween if photoBox isn't currently zooming

			isZooming = true;
			gsap.delayedCall(0.8, function () {
			  isZooming = false
			});

			if (currentImg) {
			  gsap.timeline({
				  defaults: {
					ease: 'expo.inOut'
				  }
				})
				.to('.main4Close', {
				  duration: 0.3,
				  autoAlpha: 0,
				  overwrite: true
				}, 0)
				.to('.main4Boxes', {
				  duration: 0.5,
				  scale: 1,
				  left: '75%',
				  width: 1200,
				  rotationX: 14,
				  rotationY: -15,
				  rotationZ: 10,
				  overwrite: true
				}, 0)
				.to('.photoBox', {
				  duration: 0.6,
				  opacity: 1,
				  ease: 'power4.inOut'
				}, 0)
				.to(currentImg, {
				  duration: 0.6,
				  width: 400,
				  height: 640,
				  borderRadius: 20,
				  x: currentImgProps.x,
				  y: currentImgProps.y,
				  scale: 0.5,
				  rotation: 0,
				  zIndex: 1
				}, 0)
			  // .add(playBoxes, 0.8)
			  currentImg = undefined;
			} else {
			  pauseBoxes(e.currentTarget)

			  currentImg = e.currentTarget;
			  currentImgProps.x = gsap.getProperty(currentImg, 'x');
			  currentImgProps.y = gsap.getProperty(currentImg, 'y');

			  gsap.timeline({
				  defaults: {
					duration: 0.6,
					ease: 'expo.inOut'
				  }
				})
				.set(currentImg, {
				  zIndex: 100
				})
				.fromTo('.main4Close', {
				  autoAlpha: 0
				}, {
				  autoAlpha: 1,
				  duration: 0.3,
				  ease: 'power3.inOut'
				}, 0)
				.to('.photoBox', {
				  opacity: 0
				}, 0)
				.to(currentImg, {
				  width: '100%',
				  height: '100%',
				  borderRadius: 0,
				  x: 0,
				  top: 0,
				  y: 0,
				  scale: 1,
				  opacity: 1
				}, 0)
				.to('.main4Boxes', {
				  duration: 0.5,
				  left: '50%',
				  width: '100%',
				  rotationX: 0,
				  rotationY: 0,
				  rotationZ: 0
				}, 0.15)
				.to('.main4Boxes', {
				  duration: 5,
				  scale: 1.06,
				  rotation: 0.05,
				  ease: 'none'
				}, 0.65)
			}
		  }
		});
	}


	function imageGalleryOut(container) {
		if(currentImg) $(currentImg).trigger( "click" );
		gsap.to(container, {
		  autoAlpha: 0,
		  onComplete: function () {
			$('.photoBox').off('mouseenter');
			$('.photoBox').off('mouseleave');
			$('.photoBox').off('click');
			$(container).off('mousemove');
			pauseBoxes();
			if (currentImg) {
			  gsap.set(currentImg, {
				width: 400,
				height: 640,
				borderRadius: 20,
				x: currentImgProps.x,
				y: currentImgProps.y,
				scale: 0.5,
				rotation: 0,
				zIndex: 1
			  });
			  gsap.set('.main4Boxes', {
				scale: 1,
				left: '75%',
				width: 1200,
				rotationX: 14,
				rotationY: -15,
				rotationZ: 10,
				overwrite: true
			  });
			  gsap.set('.photoBox', {
				opacity: 1
			  })
			  currentImg = undefined;
			}
		  }
		});
	}

	function pause() {
		if(currentImg) $(currentImg).trigger( "click" );
		pauseBoxes(null, true);
	}
	function play() {
		playBoxes();
	}

	inAnims.push(createImageGalleryAnimation);
	outAnims.push(imageGalleryOut);
	pauseAnims.push(pause);
	playAnims.push(play);

});