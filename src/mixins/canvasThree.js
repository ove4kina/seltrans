import * as THREE from 'three';
export const canvasThree = {
    data() {
        return {
            threeCanvas: {
                scene: null,
                camera: null,
                renderer: null,
                simplex: null,
                plane: null,
                geometry:null,
                xZoom:null,
                yZoom:null,
                noiseStrength:null
            }
        }
    },
    methods: {
        setup(){
            this.setupNoise();
            this.setupScene();
            this.setupCamera();
            this.setupRenderer();
            this.setupPlane();
            this.setupEventListeners();
        },
        setupNoise(){
            this.threeCanvas.xZoom = 4;
            this.threeCanvas.yZoom = 10;
            this.threeCanvas.noiseStrength = 0.5;
            this.threeCanvas.simplex = new SimplexNoise();
        },
        setupScene() {
            this.threeCanvas.scene = new THREE.Scene();
        },
        setupCamera() {
            let res = window.innerWidth / window.innerHeight;
            this.threeCanvas.camera = new THREE.PerspectiveCamera(20, res, 0.7, 500);
            this.threeCanvas.camera.position.x = 5;
            this.threeCanvas.camera.position.y = -12;
            this.threeCanvas.camera.position.z = 1.52;

            let controls = new THREE.OrbitControls(this.threeCanvas.camera);
            controls.enabled = false;
        },
        setupRenderer() {
            let el = document.getElementById('canvas').getBoundingClientRect();
            this.threeCanvas.renderer = new THREE.WebGLRenderer({
                alpha: true
            });
            this.threeCanvas.renderer.setSize(el.width, el.width*9/16);
            document.getElementById('canvas').appendChild(this.threeCanvas.renderer.domElement);
        },
        setupPlane() {
            let side = 100;
            this.threeCanvas.geometry = new THREE.PlaneGeometry(25, 25, side, side);
            let material = new THREE.MeshBasicMaterial({
                color: 0x0f63ed,
                wireframe: true
            });
            this.threeCanvas.plane = new THREE.Mesh(this.threeCanvas.geometry, material);

            this.threeCanvas.scene.add(this.threeCanvas.plane);
        },
        setupEventListeners() {
            window.addEventListener("resize", this.onWindowResize);
        },
        onWindowResize() {
            let el = document.getElementById('canvas').getBoundingClientRect();
            this.threeCanvas.camera.aspect = window.innerWidth / window.innerHeight;
            this.threeCanvas.camera.updateProjectionMatrix();
            this.threeCanvas.renderer.setSize(el.width, el.width*9/16);
        },
        draw() {
            requestAnimationFrame(this.draw);
            let offset = Date.now() * 0.00005;
            this.adjustVertices(offset);
            this.adjustCameraPos(offset);
            this.threeCanvas.renderer.render(this.threeCanvas.scene, this.threeCanvas.camera);
        },
        adjustVertices(offset) {
            let plane = this.threeCanvas.plane,
                geometry = this.threeCanvas.geometry;
            for (let i = 0; i < plane.geometry.vertices.length; i++) {
                let vertex = plane.geometry.vertices[i];
                let x = vertex.x / this.threeCanvas.xZoom;
                let y = vertex.y / this.threeCanvas.yZoom;
                let noise = this.threeCanvas.simplex.noise2D(x, y + offset) * this.threeCanvas.noiseStrength;
                vertex.z = noise;
            }
            geometry.verticesNeedUpdate = true;
            geometry.computeVertexNormals();
        },
        adjustCameraPos(offset) {
            let camera = this.threeCanvas.camera;
            let x = camera.position.x / this.threeCanvas.xZoom;
            let y = camera.position.y / this.threeCanvas.yZoom;
            let noise = this.threeCanvas.simplex.noise2D(x, y + offset) * this.threeCanvas.noiseStrength + 0.5;
            camera.position.z = noise;
        }
    },
    mounted(){
        if (window.innerWidth >=1200){
            (function() {
                'use strict';

                let F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
                let G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
                let F3 = 1.0 / 3.0;
                let G3 = 1.0 / 6.0;
                let F4 = (Math.sqrt(5.0) - 1.0) / 4.0;
                let G4 = (5.0 - Math.sqrt(5.0)) / 20.0;

                function SimplexNoise(random) {
                    if (!random) random = Math.random;
                    this.p = buildPermutationTable(random);
                    this.perm = new Uint8Array(512);
                    this.permMod12 = new Uint8Array(512);
                    for (let i = 0; i < 512; i++) {
                        this.perm[i] = this.p[i & 255];
                        this.permMod12[i] = this.perm[i] % 12;
                    }

                }
                SimplexNoise.prototype = {
                    grad3: new Float32Array([1, 1, 0,
                        -1, 1, 0,
                        1, -1, 0,

                        -1, -1, 0,
                        1, 0, 1,
                        -1, 0, 1,

                        1, 0, -1,
                        -1, 0, -1,
                        0, 1, 1,

                        0, -1, 1,
                        0, 1, -1,
                        0, -1, -1]),
                    grad4: new Float32Array([0, 1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1,
                        0, -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1,
                        1, 0, 1, 1, 1, 0, 1, -1, 1, 0, -1, 1, 1, 0, -1, -1,
                        -1, 0, 1, 1, -1, 0, 1, -1, -1, 0, -1, 1, -1, 0, -1, -1,
                        1, 1, 0, 1, 1, 1, 0, -1, 1, -1, 0, 1, 1, -1, 0, -1,
                        -1, 1, 0, 1, -1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, -1,
                        1, 1, 1, 0, 1, 1, -1, 0, 1, -1, 1, 0, 1, -1, -1, 0,
                        -1, 1, 1, 0, -1, 1, -1, 0, -1, -1, 1, 0, -1, -1, -1, 0]),
                    noise2D: function(xin, yin) {
                        let permMod12 = this.permMod12;
                        let perm = this.perm;
                        let grad3 = this.grad3;
                        let n0 = 0;
                        let n1 = 0;
                        let n2 = 0;
                        let s = (xin + yin) * F2;
                        let i = Math.floor(xin + s);
                        let j = Math.floor(yin + s);
                        let t = (i + j) * G2;
                        let X0 = i - t;
                        let Y0 = j - t;
                        let x0 = xin - X0;
                        let y0 = yin - Y0;
                        let i1, j1;
                        if (x0 > y0) {
                            i1 = 1;
                            j1 = 0;
                        }
                        else {
                            i1 = 0;
                            j1 = 1;
                        }
                        let x1 = x0 - i1 + G2;
                        let y1 = y0 - j1 + G2;
                        let x2 = x0 - 1.0 + 2.0 * G2;
                        let y2 = y0 - 1.0 + 2.0 * G2;
                        let ii = i & 255;
                        let jj = j & 255;
                        let t0 = 0.5 - x0 * x0 - y0 * y0;
                        if (t0 >= 0) {
                            let gi0 = permMod12[ii + perm[jj]] * 3;
                            t0 *= t0;
                            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0);
                        }
                        let t1 = 0.5 - x1 * x1 - y1 * y1;
                        if (t1 >= 0) {
                            let gi1 = permMod12[ii + i1 + perm[jj + j1]] * 3;
                            t1 *= t1;
                            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1);
                        }
                        let t2 = 0.5 - x2 * x2 - y2 * y2;
                        if (t2 >= 0) {
                            let gi2 = permMod12[ii + 1 + perm[jj + 1]] * 3;
                            t2 *= t2;
                            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2);
                        }

                        return 70.0 * (n0 + n1 + n2);
                    },
                    noise3D: function(xin, yin, zin) {
                        let permMod12 = this.permMod12;
                        let perm = this.perm;
                        let grad3 = this.grad3;
                        let n0, n1, n2, n3;
                        let s = (xin + yin + zin) * F3;
                        let i = Math.floor(xin + s);
                        let j = Math.floor(yin + s);
                        let k = Math.floor(zin + s);
                        let t = (i + j + k) * G3;
                        let X0 = i - t;
                        let Y0 = j - t;
                        let Z0 = k - t;
                        let x0 = xin - X0;
                        let y0 = yin - Y0;
                        let z0 = zin - Z0;
                        let i1, j1, k1;
                        let i2, j2, k2;
                        if (x0 >= y0) {
                            if (y0 >= z0) {
                                i1 = 1;
                                j1 = 0;
                                k1 = 0;
                                i2 = 1;
                                j2 = 1;
                                k2 = 0;
                            }
                            else if (x0 >= z0) {
                                i1 = 1;
                                j1 = 0;
                                k1 = 0;
                                i2 = 1;
                                j2 = 0;
                                k2 = 1;
                            }
                            else {
                                i1 = 0;
                                j1 = 0;
                                k1 = 1;
                                i2 = 1;
                                j2 = 0;
                                k2 = 1;
                            }
                        }
                        else {
                            if (y0 < z0) {
                                i1 = 0;
                                j1 = 0;
                                k1 = 1;
                                i2 = 0;
                                j2 = 1;
                                k2 = 1;
                            }
                            else if (x0 < z0) {
                                i1 = 0;
                                j1 = 1;
                                k1 = 0;
                                i2 = 0;
                                j2 = 1;
                                k2 = 1;
                            }
                            else {
                                i1 = 0;
                                j1 = 1;
                                k1 = 0;
                                i2 = 1;
                                j2 = 1;
                                k2 = 0;
                            }
                        }
                        let x1 = x0 - i1 + G3;
                        let y1 = y0 - j1 + G3;
                        let z1 = z0 - k1 + G3;
                        let x2 = x0 - i2 + 2.0 * G3;
                        let y2 = y0 - j2 + 2.0 * G3;
                        let z2 = z0 - k2 + 2.0 * G3;
                        let x3 = x0 - 1.0 + 3.0 * G3;
                        let y3 = y0 - 1.0 + 3.0 * G3;
                        let z3 = z0 - 1.0 + 3.0 * G3;
                        let ii = i & 255;
                        let jj = j & 255;
                        let kk = k & 255;
                        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
                        if (t0 < 0) n0 = 0.0;
                        else {
                            let gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
                            t0 *= t0;
                            n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
                        }
                        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
                        if (t1 < 0) n1 = 0.0;
                        else {
                            let gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
                            t1 *= t1;
                            n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
                        }
                        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
                        if (t2 < 0) n2 = 0.0;
                        else {
                            let gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
                            t2 *= t2;
                            n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
                        }
                        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
                        if (t3 < 0) n3 = 0.0;
                        else {
                            let gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
                            t3 *= t3;
                            n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
                        }
                        return 32.0 * (n0 + n1 + n2 + n3);
                    },

                    noise4D: function(x, y, z, w) {
                        let permMod12 = this.permMod12;
                        let perm = this.perm;
                        let grad4 = this.grad4;
                        let n0, n1, n2, n3, n4;
                        let s = (x + y + z + w) * F4;
                        let i = Math.floor(x + s);
                        let j = Math.floor(y + s);
                        let k = Math.floor(z + s);
                        let l = Math.floor(w + s);
                        let t = (i + j + k + l) * G4;
                        let X0 = i - t;
                        let Y0 = j - t;
                        let Z0 = k - t;
                        let W0 = l - t;
                        let x0 = x - X0;
                        let y0 = y - Y0;
                        let z0 = z - Z0;
                        let w0 = w - W0;
                        let rankx = 0;
                        let ranky = 0;
                        let rankz = 0;
                        let rankw = 0;
                        if (x0 > y0) rankx++;
                        else ranky++;
                        if (x0 > z0) rankx++;
                        else rankz++;
                        if (x0 > w0) rankx++;
                        else rankw++;
                        if (y0 > z0) ranky++;
                        else rankz++;
                        if (y0 > w0) ranky++;
                        else rankw++;
                        if (z0 > w0) rankz++;
                        else rankw++;
                        let i1, j1, k1, l1;
                        let i2, j2, k2, l2;
                        let i3, j3, k3, l3;
                        i1 = rankx >= 3 ? 1 : 0;
                        j1 = ranky >= 3 ? 1 : 0;
                        k1 = rankz >= 3 ? 1 : 0;
                        l1 = rankw >= 3 ? 1 : 0;
                        i2 = rankx >= 2 ? 1 : 0;
                        j2 = ranky >= 2 ? 1 : 0;
                        k2 = rankz >= 2 ? 1 : 0;
                        l2 = rankw >= 2 ? 1 : 0;
                        i3 = rankx >= 1 ? 1 : 0;
                        j3 = ranky >= 1 ? 1 : 0;
                        k3 = rankz >= 1 ? 1 : 0;
                        l3 = rankw >= 1 ? 1 : 0;
                        let x1 = x0 - i1 + G4;
                        let y1 = y0 - j1 + G4;
                        let z1 = z0 - k1 + G4;
                        let w1 = w0 - l1 + G4;
                        let x2 = x0 - i2 + 2.0 * G4;
                        let y2 = y0 - j2 + 2.0 * G4;
                        let z2 = z0 - k2 + 2.0 * G4;
                        let w2 = w0 - l2 + 2.0 * G4;
                        let x3 = x0 - i3 + 3.0 * G4;
                        let y3 = y0 - j3 + 3.0 * G4;
                        let z3 = z0 - k3 + 3.0 * G4;
                        let w3 = w0 - l3 + 3.0 * G4;
                        let x4 = x0 - 1.0 + 4.0 * G4;
                        let y4 = y0 - 1.0 + 4.0 * G4;
                        let z4 = z0 - 1.0 + 4.0 * G4;
                        let w4 = w0 - 1.0 + 4.0 * G4;
                        let ii = i & 255;
                        let jj = j & 255;
                        let kk = k & 255;
                        let ll = l & 255;
                        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0 - w0 * w0;
                        if (t0 < 0) n0 = 0.0;
                        else {
                            let gi0 = (perm[ii + perm[jj + perm[kk + perm[ll]]]] % 32) * 4;
                            t0 *= t0;
                            n0 = t0 * t0 * (grad4[gi0] * x0 + grad4[gi0 + 1] * y0 + grad4[gi0 + 2] * z0 + grad4[gi0 + 3] * w0);
                        }
                        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1 - w1 * w1;
                        if (t1 < 0) n1 = 0.0;
                        else {
                            let gi1 = (perm[ii + i1 + perm[jj + j1 + perm[kk + k1 + perm[ll + l1]]]] % 32) * 4;
                            t1 *= t1;
                            n1 = t1 * t1 * (grad4[gi1] * x1 + grad4[gi1 + 1] * y1 + grad4[gi1 + 2] * z1 + grad4[gi1 + 3] * w1);
                        }
                        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2 - w2 * w2;
                        if (t2 < 0) n2 = 0.0;
                        else {
                            let gi2 = (perm[ii + i2 + perm[jj + j2 + perm[kk + k2 + perm[ll + l2]]]] % 32) * 4;
                            t2 *= t2;
                            n2 = t2 * t2 * (grad4[gi2] * x2 + grad4[gi2 + 1] * y2 + grad4[gi2 + 2] * z2 + grad4[gi2 + 3] * w2);
                        }
                        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3 - w3 * w3;
                        if (t3 < 0) n3 = 0.0;
                        else {
                            let gi3 = (perm[ii + i3 + perm[jj + j3 + perm[kk + k3 + perm[ll + l3]]]] % 32) * 4;
                            t3 *= t3;
                            n3 = t3 * t3 * (grad4[gi3] * x3 + grad4[gi3 + 1] * y3 + grad4[gi3 + 2] * z3 + grad4[gi3 + 3] * w3);
                        }
                        let t4 = 0.6 - x4 * x4 - y4 * y4 - z4 * z4 - w4 * w4;
                        if (t4 < 0) n4 = 0.0;
                        else {
                            let gi4 = (perm[ii + 1 + perm[jj + 1 + perm[kk + 1 + perm[ll + 1]]]] % 32) * 4;
                            t4 *= t4;
                            n4 = t4 * t4 * (grad4[gi4] * x4 + grad4[gi4 + 1] * y4 + grad4[gi4 + 2] * z4 + grad4[gi4 + 3] * w4);
                        }
                        return 27.0 * (n0 + n1 + n2 + n3 + n4);
                    }
                };

                function buildPermutationTable(random) {
                    let i;
                    let p = new Uint8Array(256);
                    for (i = 0; i < 256; i++) {
                        p[i] = i;
                    }
                    for (i = 0; i < 255; i++) {
                        let r = i + ~~(random() * (256 - i));
                        let aux = p[i];
                        p[i] = p[r];
                        p[r] = aux;
                    }
                    return p;
                }
                SimplexNoise._buildPermutationTable = buildPermutationTable;
                if (typeof define !== 'undefined' && define.amd) define(function() {return SimplexNoise;});
                if (typeof exports !== 'undefined') exports.SimplexNoise = SimplexNoise;
                else if (typeof window !== 'undefined') window.SimplexNoise = SimplexNoise;
                // if (typeof module !== 'undefined') {
                //     module.exports = SimplexNoise;
                // }
            })();
            THREE.OrbitControls = function ( object, domElement ) {

                this.object = object;

                this.domElement = ( domElement !== undefined ) ? domElement : document;

                // Set to false to disable this control
                this.enabled = true;

                // "target" sets the location of focus, where the object orbits around
                this.target = new THREE.Vector3();

                // How far you can dolly in and out ( PerspectiveCamera only )
                this.minDistance = 0;
                this.maxDistance = Infinity;

                // How far you can zoom in and out ( OrthographicCamera only )
                this.minZoom = 0;
                this.maxZoom = Infinity;

                // How far you can orbit vertically, upper and lower limits.
                // Range is 0 to Math.PI radians.
                this.minPolarAngle = 0; // radians
                this.maxPolarAngle = Math.PI; // radians

                // How far you can orbit horizontally, upper and lower limits.
                // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
                this.minAzimuthAngle = - Infinity; // radians
                this.maxAzimuthAngle = Infinity; // radians

                // Set to true to enable damping (inertia)
                // If damping is enabled, you must call controls.update() in your animation loop
                this.enableDamping = false;
                this.dampingFactor = 0.25;

                // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
                // Set to false to disable zooming
                this.enableZoom = true;
                this.zoomSpeed = 1.0;

                // Set to false to disable rotating
                this.enableRotate = true;
                this.rotateSpeed = 1.0;

                // Set to false to disable panning
                this.enablePan = true;
                this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

                // Set to true to automatically rotate around the target
                // If auto-rotate is enabled, you must call controls.update() in your animation loop
                this.autoRotate = false;
                this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60

                // Set to false to disable use of the keys
                this.enableKeys = true;

                // The four arrow keys
                this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

                // Mouse buttons
                this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: THREE.MOUSE.RIGHT };

                // for reset
                this.target0 = this.target.clone();
                this.position0 = this.object.position.clone();
                this.zoom0 = this.object.zoom;

                //
                // public methods
                //

                this.getPolarAngle = function () {

                    return spherical.phi;

                };

                this.getAzimuthalAngle = function () {

                    return spherical.theta;

                };

                this.saveState = function () {

                    scope.target0.copy( scope.target );
                    scope.position0.copy( scope.object.position );
                    scope.zoom0 = scope.object.zoom;

                };

                this.reset = function () {

                    scope.target.copy( scope.target0 );
                    scope.object.position.copy( scope.position0 );
                    scope.object.zoom = scope.zoom0;

                    scope.object.updateProjectionMatrix();
                    scope.dispatchEvent( changeEvent );

                    scope.update();

                    state = STATE.NONE;

                };

                // this method is exposed, but perhaps it would be better if we can make it private...
                this.update = function () {

                    var offset = new THREE.Vector3();

                    // so camera.up is the orbit axis
                    var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
                    var quatInverse = quat.clone().inverse();

                    var lastPosition = new THREE.Vector3();
                    var lastQuaternion = new THREE.Quaternion();

                    return function update() {

                        var position = scope.object.position;

                        offset.copy( position ).sub( scope.target );

                        // rotate offset to "y-axis-is-up" space
                        offset.applyQuaternion( quat );

                        // angle from z-axis around y-axis
                        spherical.setFromVector3( offset );

                        if ( scope.autoRotate && state === STATE.NONE ) {

                            rotateLeft( getAutoRotationAngle() );

                        }

                        spherical.theta += sphericalDelta.theta;
                        spherical.phi += sphericalDelta.phi;

                        // restrict theta to be between desired limits
                        spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

                        // restrict phi to be between desired limits
                        spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

                        spherical.makeSafe();


                        spherical.radius *= scale;

                        // restrict radius to be between desired limits
                        spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

                        // move target to panned location
                        scope.target.add( panOffset );

                        offset.setFromSpherical( spherical );

                        // rotate offset back to "camera-up-vector-is-up" space
                        offset.applyQuaternion( quatInverse );

                        position.copy( scope.target ).add( offset );

                        scope.object.lookAt( scope.target );

                        if ( scope.enableDamping === true ) {

                            sphericalDelta.theta *= ( 1 - scope.dampingFactor );
                            sphericalDelta.phi *= ( 1 - scope.dampingFactor );

                        } else {

                            sphericalDelta.set( 0, 0, 0 );

                        }

                        scale = 1;
                        panOffset.set( 0, 0, 0 );

                        // update condition is:
                        // min(camera displacement, camera rotation in radians)^2 > EPS
                        // using small-angle approximation cos(x/2) = 1 - x^2 / 8

                        if ( zoomChanged ||
                            lastPosition.distanceToSquared( scope.object.position ) > EPS ||
                            8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

                            scope.dispatchEvent( changeEvent );

                            lastPosition.copy( scope.object.position );
                            lastQuaternion.copy( scope.object.quaternion );
                            zoomChanged = false;

                            return true;

                        }

                        return false;

                    };

                }();

                this.dispose = function () {

                    scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
                    scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
                    scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

                    scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
                    scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
                    scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

                    document.removeEventListener( 'mousemove', onMouseMove, false );
                    document.removeEventListener( 'mouseup', onMouseUp, false );

                    window.removeEventListener( 'keydown', onKeyDown, false );

                    //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

                };

                //
                // internals
                //

                var scope = this;

                var changeEvent = { type: 'change' };
                var startEvent = { type: 'start' };
                var endEvent = { type: 'end' };

                var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

                var state = STATE.NONE;

                var EPS = 0.000001;

                // current position in spherical coordinates
                var spherical = new THREE.Spherical();
                var sphericalDelta = new THREE.Spherical();

                var scale = 1;
                var panOffset = new THREE.Vector3();
                var zoomChanged = false;

                var rotateStart = new THREE.Vector2();
                var rotateEnd = new THREE.Vector2();
                var rotateDelta = new THREE.Vector2();

                var panStart = new THREE.Vector2();
                var panEnd = new THREE.Vector2();
                var panDelta = new THREE.Vector2();

                var dollyStart = new THREE.Vector2();
                var dollyEnd = new THREE.Vector2();
                var dollyDelta = new THREE.Vector2();

                function getAutoRotationAngle() {

                    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

                }

                function getZoomScale() {

                    return Math.pow( 0.95, scope.zoomSpeed );

                }

                function rotateLeft( angle ) {

                    sphericalDelta.theta -= angle;

                }

                function rotateUp( angle ) {

                    sphericalDelta.phi -= angle;

                }

                var panLeft = function () {

                    var v = new THREE.Vector3();

                    return function panLeft( distance, objectMatrix ) {

                        v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
                        v.multiplyScalar( - distance );

                        panOffset.add( v );

                    };

                }();

                var panUp = function () {

                    var v = new THREE.Vector3();

                    return function panUp( distance, objectMatrix ) {

                        v.setFromMatrixColumn( objectMatrix, 1 ); // get Y column of objectMatrix
                        v.multiplyScalar( distance );

                        panOffset.add( v );

                    };

                }();

                // deltaX and deltaY are in pixels; right and down are positive
                var pan = function () {

                    var offset = new THREE.Vector3();

                    return function pan( deltaX, deltaY ) {

                        var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                        if ( scope.object.isPerspectiveCamera ) {

                            // perspective
                            var position = scope.object.position;
                            offset.copy( position ).sub( scope.target );
                            var targetDistance = offset.length();

                            // half of the fov is center to top of screen
                            targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

                            // we actually don't use screenWidth, since perspective camera is fixed to screen height
                            panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
                            panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

                        } else if ( scope.object.isOrthographicCamera ) {

                            // orthographic
                            panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
                            panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

                        } else {

                            // camera neither orthographic nor perspective
                            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
                            scope.enablePan = false;

                        }

                    };

                }();

                function dollyIn( dollyScale ) {

                    if ( scope.object.isPerspectiveCamera ) {

                        scale /= dollyScale;

                    } else if ( scope.object.isOrthographicCamera ) {

                        scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
                        scope.object.updateProjectionMatrix();
                        zoomChanged = true;

                    } else {

                        console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
                        scope.enableZoom = false;

                    }

                }

                function dollyOut( dollyScale ) {

                    if ( scope.object.isPerspectiveCamera ) {

                        scale *= dollyScale;

                    } else if ( scope.object.isOrthographicCamera ) {

                        scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
                        scope.object.updateProjectionMatrix();
                        zoomChanged = true;

                    } else {

                        console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
                        scope.enableZoom = false;

                    }

                }

                //
                // event callbacks - update the object state
                //

                function handleMouseDownRotate( event ) {

                    //console.log( 'handleMouseDownRotate' );

                    rotateStart.set( event.clientX, event.clientY );

                }

                function handleMouseDownDolly( event ) {

                    //console.log( 'handleMouseDownDolly' );

                    dollyStart.set( event.clientX, event.clientY );

                }

                function handleMouseDownPan( event ) {

                    //console.log( 'handleMouseDownPan' );

                    panStart.set( event.clientX, event.clientY );

                }

                function handleMouseMoveRotate( event ) {

                    //console.log( 'handleMouseMoveRotate' );

                    rotateEnd.set( event.clientX, event.clientY );
                    rotateDelta.subVectors( rotateEnd, rotateStart );

                    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                    // rotating across whole screen goes 360 degrees around
                    rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

                    // rotating up and down along whole screen attempts to go 360, but limited to 180
                    rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

                    rotateStart.copy( rotateEnd );

                    scope.update();

                }

                function handleMouseMoveDolly( event ) {

                    //console.log( 'handleMouseMoveDolly' );

                    dollyEnd.set( event.clientX, event.clientY );

                    dollyDelta.subVectors( dollyEnd, dollyStart );

                    if ( dollyDelta.y > 0 ) {

                        dollyIn( getZoomScale() );

                    } else if ( dollyDelta.y < 0 ) {

                        dollyOut( getZoomScale() );

                    }

                    dollyStart.copy( dollyEnd );

                    scope.update();

                }

                function handleMouseMovePan( event ) {

                    //console.log( 'handleMouseMovePan' );

                    panEnd.set( event.clientX, event.clientY );

                    panDelta.subVectors( panEnd, panStart );

                    pan( panDelta.x, panDelta.y );

                    panStart.copy( panEnd );

                    scope.update();

                }

                function handleMouseUp( event ) {

                    // console.log( 'handleMouseUp' );

                }

                function handleMouseWheel( event ) {

                    // console.log( 'handleMouseWheel' );

                    if ( event.deltaY < 0 ) {

                        dollyOut( getZoomScale() );

                    } else if ( event.deltaY > 0 ) {

                        dollyIn( getZoomScale() );

                    }

                    scope.update();

                }

                function handleKeyDown( event ) {

                    //console.log( 'handleKeyDown' );

                    switch ( event.keyCode ) {

                        case scope.keys.UP:
                            pan( 0, scope.keyPanSpeed );
                            scope.update();
                            break;

                        case scope.keys.BOTTOM:
                            pan( 0, - scope.keyPanSpeed );
                            scope.update();
                            break;

                        case scope.keys.LEFT:
                            pan( scope.keyPanSpeed, 0 );
                            scope.update();
                            break;

                        case scope.keys.RIGHT:
                            pan( - scope.keyPanSpeed, 0 );
                            scope.update();
                            break;

                    }

                }

                function handleTouchStartRotate( event ) {

                    //console.log( 'handleTouchStartRotate' );

                    rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

                }

                function handleTouchStartDolly( event ) {

                    //console.log( 'handleTouchStartDolly' );

                    var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                    var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

                    var distance = Math.sqrt( dx * dx + dy * dy );

                    dollyStart.set( 0, distance );

                }

                function handleTouchStartPan( event ) {

                    //console.log( 'handleTouchStartPan' );

                    panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

                }

                function handleTouchMoveRotate( event ) {

                    //console.log( 'handleTouchMoveRotate' );

                    rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
                    rotateDelta.subVectors( rotateEnd, rotateStart );

                    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

                    // rotating across whole screen goes 360 degrees around
                    rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientWidth * scope.rotateSpeed );

                    // rotating up and down along whole screen attempts to go 360, but limited to 180
                    rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight * scope.rotateSpeed );

                    rotateStart.copy( rotateEnd );

                    scope.update();

                }

                function handleTouchMoveDolly( event ) {

                    //console.log( 'handleTouchMoveDolly' );

                    var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                    var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

                    var distance = Math.sqrt( dx * dx + dy * dy );

                    dollyEnd.set( 0, distance );

                    dollyDelta.subVectors( dollyEnd, dollyStart );

                    if ( dollyDelta.y > 0 ) {

                        dollyOut( getZoomScale() );

                    } else if ( dollyDelta.y < 0 ) {

                        dollyIn( getZoomScale() );

                    }

                    dollyStart.copy( dollyEnd );

                    scope.update();

                }

                function handleTouchMovePan( event ) {

                    //console.log( 'handleTouchMovePan' );

                    panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

                    panDelta.subVectors( panEnd, panStart );

                    pan( panDelta.x, panDelta.y );

                    panStart.copy( panEnd );

                    scope.update();

                }

                function handleTouchEnd( event ) {

                    //console.log( 'handleTouchEnd' );

                }

                //
                // event handlers - FSM: listen for events and reset state
                //

                function onMouseDown( event ) {

                    if ( scope.enabled === false ) return;

                    event.preventDefault();

                    switch ( event.button ) {

                        case scope.mouseButtons.ORBIT:

                            if ( scope.enableRotate === false ) return;

                            handleMouseDownRotate( event );

                            state = STATE.ROTATE;

                            break;

                        case scope.mouseButtons.ZOOM:

                            if ( scope.enableZoom === false ) return;

                            handleMouseDownDolly( event );

                            state = STATE.DOLLY;

                            break;

                        case scope.mouseButtons.PAN:

                            if ( scope.enablePan === false ) return;

                            handleMouseDownPan( event );

                            state = STATE.PAN;

                            break;

                    }

                    if ( state !== STATE.NONE ) {

                        document.addEventListener( 'mousemove', onMouseMove, false );
                        document.addEventListener( 'mouseup', onMouseUp, false );

                        scope.dispatchEvent( startEvent );

                    }

                }

                function onMouseMove( event ) {

                    if ( scope.enabled === false ) return;

                    event.preventDefault();

                    switch ( state ) {

                        case STATE.ROTATE:

                            if ( scope.enableRotate === false ) return;

                            handleMouseMoveRotate( event );

                            break;

                        case STATE.DOLLY:

                            if ( scope.enableZoom === false ) return;

                            handleMouseMoveDolly( event );

                            break;

                        case STATE.PAN:

                            if ( scope.enablePan === false ) return;

                            handleMouseMovePan( event );

                            break;

                    }

                }

                function onMouseUp( event ) {

                    if ( scope.enabled === false ) return;

                    handleMouseUp( event );

                    document.removeEventListener( 'mousemove', onMouseMove, false );
                    document.removeEventListener( 'mouseup', onMouseUp, false );

                    scope.dispatchEvent( endEvent );

                    state = STATE.NONE;

                }

                function onMouseWheel( event ) {

                    if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

                    event.preventDefault();
                    event.stopPropagation();

                    handleMouseWheel( event );

                    scope.dispatchEvent( startEvent ); // not sure why these are here...
                    scope.dispatchEvent( endEvent );

                }

                function onKeyDown( event ) {

                    if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

                    handleKeyDown( event );

                }

                function onTouchStart( event ) {

                    if ( scope.enabled === false ) return;

                    switch ( event.touches.length ) {

                        case 1:	// one-fingered touch: rotate

                            if ( scope.enableRotate === false ) return;

                            handleTouchStartRotate( event );

                            state = STATE.TOUCH_ROTATE;

                            break;

                        case 2:	// two-fingered touch: dolly

                            if ( scope.enableZoom === false ) return;

                            handleTouchStartDolly( event );

                            state = STATE.TOUCH_DOLLY;

                            break;

                        case 3: // three-fingered touch: pan

                            if ( scope.enablePan === false ) return;

                            handleTouchStartPan( event );

                            state = STATE.TOUCH_PAN;

                            break;

                        default:

                            state = STATE.NONE;

                    }

                    if ( state !== STATE.NONE ) {

                        scope.dispatchEvent( startEvent );

                    }

                }

                function onTouchMove( event ) {

                    if ( scope.enabled === false ) return;

                    event.preventDefault();
                    event.stopPropagation();

                    switch ( event.touches.length ) {

                        case 1: // one-fingered touch: rotate

                            if ( scope.enableRotate === false ) return;
                            if ( state !== STATE.TOUCH_ROTATE ) return; // is this needed?...

                            handleTouchMoveRotate( event );

                            break;

                        case 2: // two-fingered touch: dolly

                            if ( scope.enableZoom === false ) return;
                            if ( state !== STATE.TOUCH_DOLLY ) return; // is this needed?...

                            handleTouchMoveDolly( event );

                            break;

                        case 3: // three-fingered touch: pan

                            if ( scope.enablePan === false ) return;
                            if ( state !== STATE.TOUCH_PAN ) return; // is this needed?...

                            handleTouchMovePan( event );

                            break;

                        default:

                            state = STATE.NONE;

                    }

                }

                function onTouchEnd( event ) {

                    if ( scope.enabled === false ) return;

                    handleTouchEnd( event );

                    scope.dispatchEvent( endEvent );

                    state = STATE.NONE;

                }

                function onContextMenu( event ) {

                    if ( scope.enabled === false ) return;

                    event.preventDefault();

                }

                //

                scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

                scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
                scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

                scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
                scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
                scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

                window.addEventListener( 'keydown', onKeyDown, false );

                // force an update at start

                this.update();

            };
            THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
            THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;
            Object.defineProperties( THREE.OrbitControls.prototype, {

                center: {

                    get: function () {

                        console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
                        return this.target;

                    }

                },

                // backward compatibility

                noZoom: {

                    get: function () {

                        console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
                        return ! this.enableZoom;

                    },

                    set: function ( value ) {

                        console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
                        this.enableZoom = ! value;

                    }

                },

                noRotate: {

                    get: function () {

                        console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
                        return ! this.enableRotate;

                    },

                    set: function ( value ) {

                        console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
                        this.enableRotate = ! value;

                    }

                },

                noPan: {

                    get: function () {

                        console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
                        return ! this.enablePan;

                    },

                    set: function ( value ) {

                        console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
                        this.enablePan = ! value;

                    }

                },

                noKeys: {

                    get: function () {

                        console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
                        return ! this.enableKeys;

                    },

                    set: function ( value ) {

                        console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
                        this.enableKeys = ! value;

                    }

                },

                staticMoving: {

                    get: function () {

                        console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
                        return ! this.enableDamping;

                    },

                    set: function ( value ) {

                        console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
                        this.enableDamping = ! value;

                    }

                },

                dynamicDampingFactor: {

                    get: function () {

                        console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
                        return this.dampingFactor;

                    },

                    set: function ( value ) {

                        console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
                        this.dampingFactor = value;

                    }

                }

            } );

            this.setup();
            this.draw();
        }
    }
};