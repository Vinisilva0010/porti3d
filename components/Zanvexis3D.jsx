"use client";
// forcing refresh

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

export default function Zanvexis3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    console.log("Zanvexis3D LOADED - VERSION: FINAL REWRITE - " + new Date().toISOString());

    // --- 1. CENA ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050505'); // Preto profundo
    // Neblina para esconder o fim do mundo e dar profundidade
    scene.fog = new THREE.FogExp2(0x050505, 0.015);

    const width = window.innerWidth;
    const height = window.innerHeight;

    // --- 2. CÂMERA ---
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    // Posição inicial: vendo o quarto de um ângulo superior
    camera.position.set(0, 3, 9);

    // --- 3. RENDERIZADORES (IMPORTANTE: Criar ANTES dos controles) ---
    // 1. WebGL (Para os objetos 3D, paredes, notebook)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 2. CSS3D (Para os menus e telas HTML)
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(width, height);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0';
    // O pulo do gato: pointerEvents 'none' no container geral
    cssRenderer.domElement.style.pointerEvents = 'none'; 

    // Anexar na tela
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.domElement);
      mountRef.current.appendChild(cssRenderer.domElement);
    }

    // --- 4. CONTROLES (AGORA NA ORDEM CERTA) ---
    // Primeiro cria a variável 'controls' usando o renderizador que acabamos de criar
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // Depois configura ela
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    
    // IMPORTANTE: enableZoom FALSE para a rodinha servir de Scroll da página
    controls.enableZoom = false; 

    // ROTAÇÃO: Liberada!
    controls.minPolarAngle = 0;       // Pode olhar pro teto
    controls.maxPolarAngle = Math.PI - 0.2; // Pode olhar pro chão
    
    // Distância
    controls.minDistance = 5;
    controls.maxDistance = 20;


    
    const mats = {
      
      darkWall: new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9 }),
      floor: new THREE.MeshStandardMaterial({ color: 0x020202, roughness: 0.4, metalness: 0.5 }),
     desk: new THREE.MeshStandardMaterial({ 
        color: 0xffffff,   // Branco Absoluto
        roughness: 0.2,    // Lisinho, meio acetinado
        metalness: 0.1     // Leve toque moderno
      }), // Mesa espelhada

      // Metais mais escuros e brilhantes
      metal: new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.2, metalness: 1.0 }),
      aluminum: new THREE.MeshStandardMaterial({ 
          color: 0xaaaaaa,  // Um cinza claro, quase branco
          roughness: 0.25,  // Levemente fosco (satin)
          metalness: 1.0,   // 100% metal para pegar os reflexos das luzes neon
          envMapIntensity: 1.0 // Ajuda a refletir o ambiente
      }),

      monitorBody: new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.2 }),
      screenBlack: new THREE.MeshBasicMaterial({ color: 0x000000 }),

      // O ROXO VOLTOU COM FORÇA TOTAL
      ledCyan: new THREE.MeshBasicMaterial({ color: 0x00ffff }),
      ledPurple: new THREE.MeshBasicMaterial({ color: 0xbf00ff }), // Roxo elétrico
      ledOrange: new THREE.MeshBasicMaterial({ color: 0xff9900 }),
      ledBlue: new THREE.MeshBasicMaterial({ color: 0x0044ff }),
      ledGreen: new THREE.MeshBasicMaterial({ color: 0x00ffaa }),

      // Vidro fumê escuro (não cinza)
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x000000, transmission: 0.9, opacity: 0.5, transparent: true, roughness: 0
      }),
      coffee: new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.8 }),
      ceramic: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
    };

    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // --- 5. ESTRUTURA DO QUARTO ---
    // Chão
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), mats.floor);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    roomGroup.add(floor);

    // Paredes e Teto (Caixa invertida para ser o quarto)
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), mats.darkWall);
    backWall.position.set(0, 7.5, -5);
    backWall.receiveShadow = true;
    roomGroup.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), mats.darkWall);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-10, 7.5, 0);
    leftWall.receiveShadow = true;
    roomGroup.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(30, 15), mats.darkWall);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(10, 7.5, 0);
    rightWall.receiveShadow = true;
    roomGroup.add(rightWall);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), mats.darkWall);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 15;
    roomGroup.add(ceiling);

    // --- 6. SETUP GAMER PRINCIPAL ---
    // Tampo da Mesa
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(8, 0.2, 3.5), mats.desk);
    deskTop.position.set(0, 1.5, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    roomGroup.add(deskTop);

   // Pernas da Mesa
    const legGeo = new THREE.BoxGeometry(0.2, 1.5, 2.8);

    // AGORA: Usando 'mats.desk' para ser a mesma madeira do tampo
    const legL = new THREE.Mesh(legGeo, mats.desk); 
    legL.position.set(-3.5, 0.75, 0);
    roomGroup.add(legL);

    const legR = new THREE.Mesh(legGeo, mats.desk); 
    legR.position.set(3.5, 0.75, 0);
    roomGroup.add(legR);

    // MONITOR ULTRAWIDE (Centro)
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 2.8, -0.5);
    roomGroup.add(monitorGroup);

    const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.0, 0.2), mats.monitorBody);
    monitorGroup.add(monitorBody);
    const monitorBezel = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.9, 0.05), mats.screenBlack);
    monitorBezel.position.z = 0.11;
    monitorGroup.add(monitorBezel);

    const standNeck = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.0, 0.2), mats.metal);
    standNeck.position.set(0, -1.2, -0.1);
    monitorGroup.add(standNeck);

    // --- INTEGRAÇÃO HTML (CORRIGIDA E ILUMINADA) ---
    setTimeout(() => {
      console.log("Zanvexis3D: Tentando anexar elementos HTML no 3D...");

      // 1. O SITE NO MONITOR
      const contentDiv = document.getElementById('screen-content');
      if (contentDiv) {
        const cssObject = new CSS3DObject(contentDiv);
        cssObject.scale.set(0.0042, 0.0042, 0.0042);

        // Puxei um pouco mais para frente (0.15) para garantir que saia da tela
        cssObject.position.set(0, 0, 0.15);
        monitorGroup.add(cssObject);

        // APAGUEI O blkPlane QUE ESTAVA AQUI ATRAPALHANDO
      }

      // 2. O MENU FLUTUANTE
      // 2. O MENU DE PROJETOS
      // 2. O MENU DE PROJETOS
      // 2. O MENU DE PROJETOS
      const menuDiv = document.getElementById('project-menu');
      if (menuDiv) {
        console.log("Zanvexis3D: 'project-menu' ENCONTRADO!");
        menuDiv.style.pointerEvents = 'auto';

        const cssMenu = new CSS3DObject(menuDiv);
        cssMenu.scale.set(0.005, 0.005, 0.005);
        // FIXED Z-OFFSET (AGGRESSIVE): 2.0 (Front of everything)
        // Moved closer to camera to prevent occlusion
        cssMenu.position.set(5.5, 3.5, 2.0);
        cssMenu.rotation.y = -Math.PI / 4;
        roomGroup.add(cssMenu);

        // REMOVED glassBack mesh to prevent Z-fighting/occlusion
      } else {
        console.error("Zanvexis3D: 'project-menu' NÃO encontrado.");
      }
    }, 1000);

    // ... (Código do menu da direita que já existe) ...

      // --- NOVO: MENU PREMIUM (LADO ESQUERDO) ---
      const premiumDiv = document.getElementById('premium-menu');
      
      if (premiumDiv) {
        console.log("Zanvexis3D: 'premium-menu' ENCONTRADO!");
        premiumDiv.style.pointerEvents = 'auto'; // Permitir cliques

        const cssPremium = new CSS3DObject(premiumDiv);
        cssPremium.scale.set(0.005, 0.005, 0.005);
        
        // POSIÇÃO ESPELHADA (Lado Esquerdo)
        // X negativo (-4.5) coloca na esquerda
        cssPremium.position.set(-4.5, 3.5, 1.0); 
        
        // ROTAÇÃO INVERTIDA
        // 0.2 positivo faz ele virar para o centro (para a câmera)
        cssPremium.rotation.y = 0.2; 

        roomGroup.add(cssPremium);
      } else {
         // O React as vezes demora pra renderizar, não se assuste se der erro no primeiro frame
         console.warn("Ainda procurando o menu premium...");
      }

    // --- 7. NOTEBOOK DE TRADING (Lado Esquerdo) ---
    const laptopGroup = new THREE.Group();
    // Posicionado na mesa, à esquerda, virado para o usuário
    laptopGroup.position.set(-2.5, 1.62, 0.5);
    laptopGroup.rotation.y = Math.PI / 6;
    roomGroup.add(laptopGroup);

    // Base do Laptop
    const lapBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.8), mats.aluminum);
    laptopGroup.add(lapBase);

    // Grupo da Tela (para inclinação)
    const lapScreenGroup = new THREE.Group();
    lapScreenGroup.position.set(0, 0.025, -0.4); // Ponto de articulação
    lapScreenGroup.rotation.x = -Math.PI / 8; // Inclinação da tela aberta
    laptopGroup.add(lapScreenGroup);

    // Carcaça da Tela
    const lapScreenBack = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.02), mats.aluminum);
    lapScreenBack.position.set(0, 0.4, 0);
    lapScreenGroup.add(lapScreenBack);

    // Gráfico de Trading (HTML/CSS Hardcoded)
    const chartDiv = document.createElement('div');
    chartDiv.style.width = '400px';
    chartDiv.style.height = '250px';
    chartDiv.style.background = '#000';
    chartDiv.style.pointerEvents = 'auto'; // Permite interação se necessário
    // Cria um gráfico de velas fake com CSS
    chartDiv.innerHTML = `
      <div style="width:100%;height:100%;background:linear-gradient(to bottom, #0a0a0a, #000);display:flex;align-items:center;justify-content:center;flex-direction:column;border:4px solid #222;box-sizing:border-box;overflow:hidden; padding: 10px;">
        <div style="width:100%; display:flex; justify-content: space-between; color:#00ff00;font-family:monospace;font-size:14px; margin-bottom: 10px;">
            <span>BTC/USD</span><span>+5.2%</span>
        </div>
        <div style="display:flex;gap:8px;align-items:flex-end;height:160px;width:100%;">
           <div style="flex:1;height:40%;background:#ff4444;position:relative;"><div style="position:absolute;top:-10px;left:45%;width:2px;height:10px;background:#ff4444;"></div><div style="position:absolute;bottom:-15px;left:45%;width:2px;height:15px;background:#ff4444;"></div></div>
           <div style="flex:1;height:60%;background:#00ff00;position:relative;"><div style="position:absolute;top:-20px;left:45%;width:2px;height:20px;background:#00ff00;"></div></div>
           <div style="flex:1;height:30%;background:#ff4444;"></div>
           <div style="flex:1;height:80%;background:#00ff00;box-shadow:0 0 10px #00ff00;"></div>
           <div style="flex:1;height:50%;background:#ff4444;"></div>
           <div style="flex:1;height:90%;background:#00ff00;"></div>
           <div style="flex:1;height:85%;background:#00ff00;box-shadow:0 0 15px #00ff00;"></div>
        </div>
      </div>
    `;

    const laptopScreenObj = new CSS3DObject(chartDiv);
    laptopScreenObj.scale.set(0.00285, 0.00285, 0.00285);
    laptopScreenObj.position.set(0, 0.4, 0.015);
    lapScreenGroup.add(laptopScreenObj);


    // --- 8. PERIFÉRICOS & DECORAÇÃO ---

    // PC GAMER (Gabinete à direita)
    const pcCase = new THREE.Group();
    pcCase.position.set(3.2, 2.3, 0.5);
    roomGroup.add(pcCase);
    // Corpo
    pcCase.add(new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 1.8), mats.aluminum));
    // Vidro Lateral
    const caseGlass = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.6, 1.6), mats.glass);
    caseGlass.position.x = -0.46;
    pcCase.add(caseGlass);

    // Fans RGB
    const fanGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.05, 16);
    const fan1 = new THREE.Mesh(fanGeo, mats.ledCyan);
    fan1.rotation.z = Math.PI / 2; fan1.position.set(-0.3, 0.5, 0.6); pcCase.add(fan1);
    const fan2 = new THREE.Mesh(fanGeo, mats.ledPurple);
    fan2.rotation.z = Math.PI / 2; fan2.position.set(-0.3, -0.3, 0.6); pcCase.add(fan2);
    // Luz interna
    const pcLight = new THREE.PointLight(0x00ffff, 3, 4);
    pcLight.position.set(0, 0, 0);
    pcCase.add(pcLight);

    // Teclado
    const keyboard = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.05, 0.6), mats.metal);
    keyboard.position.set(0, 1.63, 0.8);
    roomGroup.add(keyboard);
    const keyGlow = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.04, 0.62), mats.ledPurple);
    keyGlow.position.set(0, 1.62, 0.8);
    roomGroup.add(keyGlow);

    // Mousepad & Mouse
    const mousePad = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.02, 1.2), mats.screenBlack);
    mousePad.position.set(0, 1.61, 0.8);
    roomGroup.add(mousePad);
    const mouse = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.3), mats.monitorBody);
    mouse.position.set(1.1, 1.65, 0.8);
    roomGroup.add(mouse);

    // Caixas de Som
    const speakerGeo = new THREE.BoxGeometry(0.5, 0.8, 0.5);
    const speakerL = new THREE.Mesh(speakerGeo, mats.monitorBody);
    speakerL.position.set(-3.0, 1.9, 0); roomGroup.add(speakerL);
    const speakerDetailL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02), mats.ledCyan);
    speakerDetailL.rotation.x = Math.PI / 2; speakerDetailL.position.set(0, 0, 0.26); speakerL.add(speakerDetailL);
    const speakerR = new THREE.Mesh(speakerGeo, mats.monitorBody);
    speakerR.position.set(2.5, 1.9, 0); roomGroup.add(speakerR);
    speakerR.add(speakerDetailL.clone());

    // Caneca de Café
    const mugGroup = new THREE.Group();
    mugGroup.position.set(-1.2, 1.6, 1.2);
    roomGroup.add(mugGroup);
    mugGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.25, 16), mats.ceramic));
    const coffeeLiquid = new THREE.Mesh(new THREE.CircleGeometry(0.11, 16), mats.coffee);
    coffeeLiquid.rotation.x = -Math.PI / 2; coffeeLiquid.position.y = 0.1; mugGroup.add(coffeeLiquid);
    const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 8, 16, Math.PI), mats.ceramic);
    mugHandle.position.set(0.12, 0, 0); mugHandle.rotation.z = -Math.PI / 2; mugGroup.add(mugHandle);

    // Fitas de LED (Chão e Teto)
    const ceilingLed1 = new THREE.Mesh(new THREE.BoxGeometry(30, 0.1, 0.1), mats.ledPurple);
    ceilingLed1.position.set(0, 14.9, -4.9); roomGroup.add(ceilingLed1);
    const floorLed = new THREE.Mesh(new THREE.BoxGeometry(8, 0.05, 0.05), mats.ledCyan);
    floorLed.position.set(0, 0.05, 2.0); roomGroup.add(floorLed);

    // PAREDE DE TECHS (Nanoleafs + Ícones)
    const nanoGroup = new THREE.Group();
    nanoGroup.position.set(0, 6, -4.9); // Na parede de fundo
    roomGroup.add(nanoGroup);
    const triGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.05, 3);
    const tri1 = new THREE.Mesh(triGeo, mats.ledCyan); tri1.rotation.x = Math.PI / 2; nanoGroup.add(tri1);
    const tri2 = new THREE.Mesh(triGeo, mats.ledPurple); tri2.rotation.x = Math.PI / 2; tri2.rotation.z = Math.PI; tri2.position.set(0.7, 0.35, 0); nanoGroup.add(tri2);
    const tri3 = new THREE.Mesh(triGeo, mats.ledPurple); tri3.rotation.x = Math.PI / 2; tri3.rotation.z = Math.PI; tri3.position.set(-0.7, 0.35, 0); nanoGroup.add(tri3);
    const wallLight = new THREE.PointLight(0xaa00ff, 4, 10); wallLight.position.set(0, 0, 1); nanoGroup.add(wallLight);

    // Prateleira de Ícones
    const techShelfY = 7.5;
    const techShelfZ = -4.8;
    const iconSize = 0.7;
    const gap = 1.0;
    const techs = [
      { icon: 'javascript', color: 0xf7df1e },
      { icon: 'react', color: 0x61dafb },
      { icon: 'nextjs-icon', color: 0xffffff },
      { icon: 'nodejs', color: 0x339933 },
      { icon: 'rust', color: 0xDEA584 }
    ];
    techs.forEach((tech, i) => {
      const xPos = (i - (techs.length - 1) / 2) * gap;
      const frame = new THREE.Mesh(new THREE.BoxGeometry(iconSize, iconSize, 0.05), new THREE.MeshStandardMaterial({ color: 0x222222 }));
      frame.position.set(xPos, techShelfY, techShelfZ);
      roomGroup.add(frame);

      const iconDiv = document.createElement('div');
      iconDiv.style.width = '100px'; iconDiv.style.height = '100px'; iconDiv.style.background = 'transparent';
      // Usa a API pública do Iconify
      iconDiv.innerHTML = `<img src="https://api.iconify.design/logos/${tech.icon}.svg" width="100%" height="100%" style="filter: drop-shadow(0 0 8px ${'#' + tech.color.toString(16)});">`;
      const cssIcon = new CSS3DObject(iconDiv);
      cssIcon.scale.set(0.006, 0.006, 0.006); cssIcon.position.set(0, 0, 0.06); frame.add(cssIcon);
      const iconLight = new THREE.PointLight(tech.color, 1.5, 3); iconLight.position.set(0, 0, 0.5); frame.add(iconLight);
    });

    // --- QUADROS CRYPTO (Laterais com Neon) ---
    const addCryptoFrame = (x, z, rotationY, coin, colorHex, colorMat) => {
      const frameGroup = new THREE.Group();
      frameGroup.position.set(x, 6, z);
      frameGroup.rotation.y = rotationY;
      roomGroup.add(frameGroup);

      // Moldura Neon
      const border = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.05), colorMat);
      frameGroup.add(border);
      // Fundo Preto
      const bg = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 2.0), mats.screenBlack);
      bg.position.z = 0.03;
      frameGroup.add(bg);

      // Logo SVG via CSS3D
      const logoDiv = document.createElement('div');
      logoDiv.style.width = '300px'; logoDiv.style.height = '300px';
      logoDiv.innerHTML = `<img src="https://api.iconify.design/cryptocurrency:${coin}.svg" width="100%" height="100%" style="filter: drop-shadow(0 0 20px ${colorHex});">`;

      const cssLogo = new CSS3DObject(logoDiv);
      cssLogo.scale.set(0.006, 0.006, 0.006);
      cssLogo.position.set(0, 0, 0.05);
      frameGroup.add(cssLogo);

      // Luz volumétrica
      const light = new THREE.PointLight(parseInt(colorHex.replace('#', '0x')), 5, 8);
      light.position.set(0, 0, 1.5);
      frameGroup.add(light);
    };

    // Bitcoin (Laranja) na Esquerda
    addCryptoFrame(-9.8, -2, Math.PI / 2, 'btc', '#ff9900', mats.ledOrange);
    // Ethereum (Azul) na Direita
    addCryptoFrame(9.8, -3, -Math.PI / 2, 'eth', '#4444ff', mats.ledBlue);
    // Solana (Verde) na Direita
    addCryptoFrame(9.8, 3, -Math.PI / 2, 'sol', '#00ffaa', mats.ledGreen);


    // --- 9. ILUMINAÇÃO GERAL (FIXED & BALANCED) ---
    // HEMISPHERE LIGHT: Melhor que AmbientLight para 3D. Céu Azulado, Chão Escuro.
    // Intesidade 3.0 para garantir que TUDO seja visível base.
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3.0);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Spot Principal (Dramaticidade)
    const spotLight = new THREE.SpotLight(0xffffff, 50);
    spotLight.position.set(0, 15, 5);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    scene.add(spotLight);

    // LUZ DE FUNDO: ROXO FORTE (Backlight)
    const backLight = new THREE.PointLight(0xbf00ff, 10, 30);
    backLight.position.set(0, 5, -4.5);
    scene.add(backLight);

    // Luz Lateral Ciano
    const sideLight = new THREE.PointLight(0x00ffff, 5, 20);
    sideLight.position.set(-8, 5, 2);
    scene.add(sideLight);


 // --- 10. LOOP CORRIGIDO (SEM TRAVAMENTO) ---
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Lógica do Scroll (Efeito Túnel)
      if (typeof window !== 'undefined' && roomGroup) {
         const scrollY = window.scrollY;
         
         // Ao invés de mexer na câmera, empurramos o QUARTO para longe.
         // Quanto mais rola, mais negativo fica o Z do quarto.
         const targetZ = 0 - (scrollY * 0.05); // Ajuste 0.05 para velocidade
         
         // Movemos o quarto para o fundo
         roomGroup.position.z = targetZ;
         
         // Opcional: Faz o quarto girar levemente enquanto afasta (efeito dramático)
         // roomGroup.rotation.y = scrollY * 0.0005; 
      }

      // Animação das fans
      if (typeof fan1 !== 'undefined') fan1.rotation.y += 0.15;
      if (typeof fan2 !== 'undefined') fan2.rotation.y += 0.15;

      controls.update(); // Agora o controls funciona livre para girar!
      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
    };

    // --- 11. RESIZE ---
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      cssRenderer.setSize(w, h);
    };

    let frameId = requestAnimationFrame(animate);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}