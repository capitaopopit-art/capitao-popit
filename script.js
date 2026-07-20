'use strict';

/* =========================================================
   CAPITÃO POP IT
   ARQUIVO: script.js
   VERSÃO COM QUEBRA-CABEÇA
========================================================= */

function initializeSite() {
    const initializers = [
        initializeCurrentYear,
        initializeMobileMenu,
        initializeBackToTop,
        initializeCharacterModal,
        initializeStoryModal,
        initializeInteractiveStory,
        initializeGameNavigation,
        initializePuzzleGame,
        initializeColoringGame
    ];

    initializers.forEach((initializer) => {
        try {
            initializer();
        } catch (error) {
            console.error(
                `Erro ao iniciar ${initializer.name}:`,
                error
            );
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener(
        'DOMContentLoaded',
        initializeSite,
        { once: true }
    );
} else {
    initializeSite();
}

/* =========================================================
   FUNÇÕES AUXILIARES
========================================================= */

function scrollToElement(element) {
    if (!element) {
        return;
    }

    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function setBodyModalState(isOpen) {
    document.body.classList.toggle('modal-open', isOpen);
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

/* =========================================================
   ANO AUTOMÁTICO DO RODAPÉ
========================================================= */

function initializeCurrentYear() {
    const currentYear = document.getElementById('currentYear');

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }
}

/* =========================================================
   MENU MOBILE
========================================================= */

function initializeMobileMenu() {
    const menuButton = document.getElementById('menuButton');
    const navigation = document.getElementById('mainNavigation');

    if (!menuButton || !navigation) {
        return;
    }

    const closeMenu = () => {
        menuButton.classList.remove('is-open');
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute(
            'aria-label',
            'Abrir menu principal'
        );
        document.body.classList.remove('menu-open');
    };

    const openMenu = () => {
        menuButton.classList.add('is-open');
        navigation.classList.add('is-open');
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.setAttribute(
            'aria-label',
            'Fechar menu principal'
        );
        document.body.classList.add('menu-open');
    };

    menuButton.addEventListener('click', () => {
        if (navigation.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 980) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
        }
    });
}

/* =========================================================
   BOTÃO VOLTAR AO TOPO
========================================================= */

function initializeBackToTop() {
    const button = document.getElementById('backToTopButton');

    if (!button) {
        return;
    }

    const updateVisibility = () => {
        button.classList.toggle(
            'is-visible',
            window.scrollY > 600
        );
    };

    window.addEventListener('scroll', updateVisibility, {
        passive: true
    });

    updateVisibility();

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =========================================================
   PERSONAGENS
========================================================= */

const characterData = {
    popit: {
        name: 'Capitão Pop It',
        label: 'Personagem principal',
        image: 'img/personagens/popit.png',
        description:
            'Capitão Pop It é alegre, corajoso e sempre disposto a ajudar. Quando o Pop Alerta aparece, ele observa o problema, escuta os amigos e usa a criatividade para encontrar uma solução.',
        details: [
            ['Personalidade', 'Corajoso, divertido e criativo'],
            [
                'Missão',
                'Transformar cada Pop-Problema em aprendizado'
            ],
            ['Lugar especial', 'Central Pop It']
        ]
    },

    'miss-pop': {
        name: 'Miss Pop',
        label: 'Heroína da Central',
        image: 'img/personagens/miss-pop.png',
        description:
            'Miss Pop é inteligente, animada e cheia de boas ideias. Ela trabalha ao lado do Capitão Pop It e ajuda a turma a conversar, organizar os pensamentos e escolher o melhor caminho.',
        details: [
            [
                'Personalidade',
                'Inteligente, confiante e carinhosa'
            ],
            ['Talento', 'Criar soluções e unir a turma'],
            ['Lugar especial', 'Central Pop It']
        ]
    },

    lia: {
        name: 'Lia',
        label: 'Alegre e criativa',
        image: 'img/personagens/lia.png',
        description:
            'Lia vive as aventuras do mundo real no parquinho e no condomínio. Ela gosta de brincar, imaginar novas possibilidades e participar das soluções ao lado dos amigos.',
        details: [
            ['Personalidade', 'Carinhosa, alegre e criativa'],
            ['Gosta de', 'Brincadeiras e novas descobertas'],
            ['Ajuda a turma com', 'Imaginação e gentileza']
        ]
    },

    max: {
        name: 'Max',
        label: 'Curioso e inteligente',
        image: 'img/personagens/max.png',
        description:
            'Max gosta de fazer perguntas, observar os detalhes e descobrir como as coisas funcionam. Sua curiosidade ajuda a turma a compreender melhor cada Pop-Problema.',
        details: [
            ['Personalidade', 'Curioso, atento e inteligente'],
            ['Gosta de', 'Investigar e aprender'],
            ['Ajuda a turma com', 'Perguntas e observações']
        ]
    },

    gelecao: {
        name: 'Gelecão',
        label: 'Divertido e surpreendente',
        image: 'img/personagens/gelecao.png',
        description:
            'Gelecão é engraçado, elástico e cheio de energia. Mesmo quando fica atrapalhado, ele mostra que é possível tentar de novo, aprender com os erros e continuar ajudando os amigos.',
        details: [
            [
                'Personalidade',
                'Brincalhão, animado e atrapalhado'
            ],
            ['Talento', 'Transformar tensão em diversão'],
            [
                'Lição especial',
                'Tentar novamente sem desistir'
            ]
        ]
    },

    cloud: {
        name: 'Cloud',
        label: 'A nuvenzinha da turma',
        image: 'img/personagens/cloud.png',
        description:
            'Cloud é uma nuvenzinha leve, delicada e encantadora. Ela acompanha as aventuras, ajuda a turma a observar o ambiente e lembra que a calma também pode ajudar a resolver problemas.',
        details: [
            ['Personalidade', 'Calma, delicada e alegre'],
            ['Talento', 'Observar o ambiente'],
            [
                'Lição especial',
                'Respirar, pensar e agir com calma'
            ]
        ]
    },

    helio: {
        name: 'Balão Hélio',
        label: 'Sonhador e curioso',
        image: 'img/personagens/helio-balao.png',
        description:
            'Balão Hélio observa tudo lá do alto. Seu jeito sonhador ajuda os amigos a enxergarem novas possibilidades e a perceberem detalhes que poderiam passar despercebidos.',
        details: [
            ['Personalidade', 'Sonhador, simpático e curioso'],
            [
                'Talento',
                'Enxergar as situações de outro ponto de vista'
            ],
            ['Ajuda a turma com', 'Novas ideias e observação']
        ]
    },

    'dog-doug': {
        name: 'Dog Doug',
        label: 'Amigo e companheiro',
        image: 'img/personagens/dog-doug.png',
        description:
            'Dog Doug é o cãozinho fiel da turma. Ele adora brincar, acompanhar as missões e demonstrar carinho. Sua presença ensina sobre amizade, cuidado e respeito aos animais.',
        details: [
            ['Personalidade', 'Fiel, brincalhão e carinhoso'],
            ['Gosta de', 'Brincar e acompanhar a turma'],
            [
                'Lição especial',
                'Cuidar e respeitar os animais'
            ]
        ]
    }
};

/* =========================================================
   MODAL DOS PERSONAGENS
========================================================= */

function initializeCharacterModal() {
    const modal = document.getElementById('characterModal');
    const image = document.getElementById('characterModalImage');
    const label = document.getElementById('characterModalLabel');
    const title = document.getElementById('characterModalTitle');
    const description = document.getElementById(
        'characterModalDescription'
    );
    const details = document.getElementById(
        'characterModalDetails'
    );
    const buttons = document.querySelectorAll(
        '.character-details-button'
    );

    if (
        !modal ||
        !image ||
        !label ||
        !title ||
        !description ||
        !details
    ) {
        return;
    }

    let previouslyFocusedElement = null;

    const closeModal = () => {
        if (modal.hidden) {
            return;
        }

        modal.hidden = true;
        setBodyModalState(false);

        if (
            previouslyFocusedElement &&
            typeof previouslyFocusedElement.focus === 'function'
        ) {
            previouslyFocusedElement.focus();
        }
    };

    const openModal = (characterKey) => {
        const character = characterData[characterKey];

        if (!character) {
            return;
        }

        previouslyFocusedElement = document.activeElement;

        image.src = character.image;
        image.alt = character.name;
        label.textContent = character.label;
        title.textContent = character.name;
        description.textContent = character.description;

        details.innerHTML = character.details
            .map(
                ([detailTitle, detailText]) => `
                    <div>
                        <strong>${escapeHtml(detailTitle)}:</strong>
                        <span>${escapeHtml(detailText)}</span>
                    </div>
                `
            )
            .join('');

        modal.hidden = false;
        setBodyModalState(true);

        const closeButton = modal.querySelector(
            '.modal-close-button'
        );

        if (closeButton) {
            closeButton.focus();
        }
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            openModal(button.dataset.character);
        });
    });

    modal.querySelectorAll('[data-close-modal]').forEach(
        (element) => {
            element.addEventListener('click', closeModal);
        }
    );

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });
}

/* =========================================================
   HISTÓRIAS
========================================================= */

const storyData = {
    'fruta-misteriosa': {
        category: 'Alimentação saudável',
        title: 'Pop It e a Fruta Misteriosa',
        body: `
            <p>
                Era uma manhã ensolarada no parquinho. Capitão
                Pop It, Lia e Max brincavam de procurar formas
                nas nuvens quando o <strong>Pop Alerta</strong>
                apareceu na Central Pop It.
            </p>

            <p>
                Na tela havia uma cesta com uma fruta que ninguém
                conhecia. Lia achou a cor bonita, Max ficou
                curioso e Gelecão perguntou:
                “Será que ela pula?”
            </p>

            <p>
                Capitão Pop It explicou que, antes de experimentar
                qualquer alimento, é importante pedir ajuda a um
                adulto. Miss Pop lavou a fruta, cortou um pequeno
                pedaço e mostrou que todos podiam observar o
                cheiro, a cor e a textura.
            </p>

            <p>
                Pop It provou devagar. A fruta era doce e
                refrescante! Lia também gostou. Max achou o sabor
                diferente, mas ficou feliz por ter experimentado.
            </p>

            <p>
                Gelecão fez uma careta engraçada e todos riram.
                Miss Pop lembrou que cada pessoa pode gostar de
                sabores diferentes e que experimentar com cuidado
                é uma ótima forma de descobrir novos alimentos.
            </p>

            <p>
                No fim, a turma preparou uma salada de frutas
                colorida. Capitão Pop It comemorou:
                <strong>“Pop-Problema resolvido!”</strong>
            </p>

            <p>
                <strong>Aprendizado:</strong> experimentar frutas
                e alimentos variados, com a ajuda de um adulto,
                pode ser divertido e saudável.
            </p>
        `
    },

    'dia-da-amizade': {
        category: 'Amizade e respeito',
        title: 'Miss Pop e o Dia da Amizade',
        body: `
            <p>
                Lia e Max estavam montando uma cidade de blocos
                no parquinho. Lia queria construir uma ponte.
                Max queria construir uma torre. Os dois começaram
                a falar ao mesmo tempo e ficaram chateados.
            </p>

            <p>
                Nesse instante, o <strong>Pop Alerta</strong>
                apareceu. Miss Pop chegou com Capitão Pop It e
                perguntou o que havia acontecido. Primeiro, ela
                ouviu Lia. Depois, ouviu Max.
            </p>

            <p>
                Miss Pop explicou que amigos podem ter ideias
                diferentes. O importante é falar com calma,
                escutar e procurar uma solução que permita a
                participação de todos.
            </p>

            <p>
                Cloud teve uma ideia: a torre poderia ficar do
                outro lado da ponte. Balão Hélio olhou de cima e
                mostrou o melhor lugar para cada construção.
            </p>

            <p>
                Lia pediu desculpas por não ter escutado Max.
                Max também pediu desculpas. Juntos, eles criaram
                uma cidade ainda maior, com ponte, torre, praça
                e uma casinha para Dog Doug.
            </p>

            <p>
                Miss Pop sorriu e disse:
                <strong>
                    “Quando escutamos uns aos outros, nossas
                    ideias ficam ainda melhores.”
                </strong>
            </p>

            <p>
                <strong>Aprendizado:</strong> conversar, ouvir e
                pedir desculpas ajuda a cuidar das amizades.
            </p>
        `
    },

    'salva-parquinho': {
        category: 'Meio ambiente',
        title: 'A Turma Salva o Parquinho',
        body: `
            <p>
                Depois de um dia movimentado, a turma encontrou
                papéis e embalagens espalhados pelo parquinho.
                Dog Doug tentou brincar, mas quase pisou em uma
                garrafa vazia.
            </p>

            <p>
                O <strong>Pop Alerta</strong> tocou na Central
                Pop It. Capitão Pop It explicou que o lixo no
                chão pode machucar os animais, sujar o ambiente
                e atrapalhar as brincadeiras.
            </p>

            <p>
                Com a ajuda de um adulto e usando luvas, a turma
                começou a separar os materiais. Lia colocou os
                papéis juntos. Max ajudou a identificar o que
                poderia ser reciclado.
            </p>

            <p>
                Gelecão tentou carregar muitas coisas de uma vez
                e derrubou tudo. Ele respirou fundo, pediu ajuda
                e percebeu que trabalhar em equipe era mais fácil.
            </p>

            <p>
                Cloud observou que uma plantinha estava amassada.
                Balão Hélio encontrou um lugar seguro para
                replantá-la, e todos ajudaram a colocar um pouco
                de água.
            </p>

            <p>
                Quando terminaram, o parquinho estava limpo e
                bonito novamente. Capitão Pop It lembrou:
                <strong>
                    “O melhor é não jogar lixo no chão. Cada
                    coisa deve ir para o lugar certo.”
                </strong>
            </p>

            <p>
                <strong>Aprendizado:</strong> cuidar do ambiente
                é uma tarefa de todos, sempre com orientação de
                um adulto.
            </p>
        `
    },

    'todas-historias': {
        category: 'Biblioteca da Turma Pop It',
        title: 'Todas as histórias',
        body: `
            <p>
                A biblioteca já começou com três aventuras
                educativas:
            </p>

            <p>
                <strong>1. Pop It e a Fruta Misteriosa</strong>
                <br>
                Uma história sobre experimentar novos alimentos
                com cuidado.
            </p>

            <p>
                <strong>2. Miss Pop e o Dia da Amizade</strong>
                <br>
                Uma aventura sobre conversar, ouvir e respeitar
                os amigos.
            </p>

            <p>
                <strong>3. A Turma Salva o Parquinho</strong>
                <br>
                Uma missão sobre natureza, organização e trabalho
                em equipe.
            </p>
        `
    }
};

/* =========================================================
   MODAL DAS HISTÓRIAS
========================================================= */

function initializeStoryModal() {
    const modal = document.getElementById('storyModal');
    const category = document.getElementById(
        'storyModalCategory'
    );
    const title = document.getElementById('storyModalTitle');
    const body = document.getElementById('storyModalBody');
    const storyButtons = document.querySelectorAll(
        '.story-button'
    );
    const allStoriesButton = document.getElementById(
        'showAllStoriesButton'
    );

    if (!modal || !category || !title || !body) {
        return;
    }

    let previouslyFocusedElement = null;

    const closeStory = () => {
        if (modal.hidden) {
            return;
        }

        modal.hidden = true;
        setBodyModalState(false);

        if (
            previouslyFocusedElement &&
            typeof previouslyFocusedElement.focus === 'function'
        ) {
            previouslyFocusedElement.focus();
        }
    };

    const openStory = (storyKey) => {
        const story = storyData[storyKey];

        if (!story) {
            return;
        }

        previouslyFocusedElement = document.activeElement;

        category.textContent = story.category;
        title.textContent = story.title;
        body.innerHTML = story.body;

        modal.hidden = false;
        setBodyModalState(true);

        const closeButton = modal.querySelector(
            '.modal-close-button'
        );

        if (closeButton) {
            closeButton.focus();
        }
    };

    storyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            openStory(button.dataset.story);
        });
    });

    if (allStoriesButton) {
        allStoriesButton.addEventListener('click', () => {
            openStory('todas-historias');
        });
    }

    modal
        .querySelectorAll('[data-close-story-modal]')
        .forEach((element) => {
            element.addEventListener('click', closeStory);
        });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) {
            closeStory();
        }
    });
}

/* =========================================================
   HISTÓRIA INTERATIVA
========================================================= */

function initializeInteractiveStory() {
    const result = document.getElementById(
        'interactiveResult'
    );
    const options = document.querySelectorAll(
        '.interactive-option'
    );

    if (!result || options.length === 0) {
        return;
    }

    options.forEach((option) => {
        option.addEventListener('click', () => {
            const choice = option.dataset.choice;

            result.classList.remove(
                'show',
                'good-choice',
                'learning-choice'
            );

            if (choice === 'fruit') {
                result.innerHTML = `
                    <strong>Boa escolha!</strong>
                    <br>
                    A fruta ajuda a deixar a refeição mais
                    colorida e nutritiva. Pop It pode pedir a
                    um adulto para lavar e preparar a fruta
                    antes de comer.
                `;

                result.classList.add('good-choice');
            } else {
                result.innerHTML = `
                    <strong>Vamos pensar juntos!</strong>
                    <br>
                    Um doce pode fazer parte de alguns momentos,
                    mas comer muitos de uma vez não é a melhor
                    escolha. Pop It pode primeiro escolher uma
                    fruta e conversar com um adulto.
                `;

                result.classList.add('learning-choice');
            }

            requestAnimationFrame(() => {
                result.classList.add('show');
            });
        });
    });
}

/* =========================================================
   NAVEGAÇÃO DOS JOGOS
========================================================= */

function initializeGameNavigation() {
    document.querySelectorAll('[data-game]').forEach(
        (button) => {
            button.addEventListener('click', () => {
                if (
                    button.dataset.game ===
                    'interactive-story'
                ) {
                    scrollToElement(
                        document.querySelector(
                            '.interactive-story-section'
                        )
                    );
                }
            });
        }
    );
}

/* =========================================================
   QUEBRA-CABEÇA POP IT
========================================================= */

function initializePuzzleGame() {
    const section = document.getElementById(
        'puzzleGameSection'
    );
    const board = document.getElementById('puzzleBoard');
    const movesElement = document.getElementById(
        'puzzleMoves'
    );
    const characterNameElement = document.getElementById(
        'puzzleCharacterName'
    );
    const messageElement = document.getElementById(
        'puzzleMessage'
    );
    const closeButton = document.getElementById(
        'closePuzzleGameButton'
    );
    const shuffleButton = document.getElementById(
        'shufflePuzzleButton'
    );
    const previewButton = document.getElementById(
        'previewPuzzleButton'
    );
    const previewCard = document.getElementById(
        'puzzlePreviewCard'
    );
    const previewImage = document.getElementById(
        'puzzlePreviewImage'
    );
    const openButton = document.getElementById(
        'openPuzzleGameButton'
    );
    const layout = section?.querySelector(
        '.puzzle-game-layout'
    );
    const characterButtons = document.querySelectorAll(
        '.puzzle-character-option'
    );

    const requiredElements = {
        section,
        board,
        movesElement,
        characterNameElement,
        messageElement,
        closeButton,
        shuffleButton,
        previewButton,
        previewCard,
        previewImage,
        openButton,
        layout
    };

    const missingElements = Object.entries(requiredElements)
        .filter(([, element]) => !element)
        .map(([name]) => name);

    if (
        missingElements.length > 0 ||
        characterButtons.length === 0
    ) {
        console.error(
            'Não foi possível iniciar o quebra-cabeça.',
            {
                elementosAusentes: missingElements,
                botoesDePersonagem:
                    characterButtons.length
            }
        );

        return;
    }

    if (section.dataset.puzzleInitialized === 'true') {
        return;
    }

    section.dataset.puzzleInitialized = 'true';

    const characters = {
        popit: {
            name: 'Capitão Pop It',
            image: 'img/personagens/popit.png',
            colors: ['#b9f2ff', '#e9ddff', '#fff1a9']
        },

        'miss-pop': {
            name: 'Miss Pop',
            image: 'img/personagens/miss-pop.png',
            colors: ['#ffd0ea', '#eee0ff', '#b9f2ff']
        },

        gelecao: {
            name: 'Gelecão',
            image: 'img/personagens/gelecao.png',
            colors: ['#dfffa8', '#b9f2ff', '#fff1a9']
        },

        cloud: {
            name: 'Cloud',
            image: 'img/personagens/cloud.png',
            colors: ['#d9f8ff', '#eee4ff', '#ffd9ef']
        },

        'dog-doug': {
            name: 'Dog Doug',
            image: 'img/personagens/dog-doug.png',
            colors: ['#fff2d6', '#ffd9ef', '#d9f8ff']
        }
    };

    const solvedOrder = Array.from(
        { length: 9 },
        (_, index) => index
    );

    let selectedCharacter = 'popit';
    let currentOrder = [...solvedOrder];
    let selectedPosition = null;
    let moves = 0;
    let gameBuilt = false;
    let artworkToken = 0;
    let puzzleImageSource =
        characters[selectedCharacter].image;

    const isSolved = () =>
        currentOrder.every(
            (tileIndex, position) =>
                tileIndex === position
        );

    const countWrongPieces = (order) =>
        order.reduce(
            (total, tileIndex, position) =>
                total +
                Number(tileIndex !== position),
            0
        );

    const shuffle = (items) => {
        const result = [...items];

        for (
            let index = result.length - 1;
            index > 0;
            index -= 1
        ) {
            const randomIndex = Math.floor(
                Math.random() * (index + 1)
            );

            [
                result[index],
                result[randomIndex]
            ] = [
                result[randomIndex],
                result[index]
            ];
        }

        return result;
    };

    const updateStatus = () => {
        movesElement.textContent = String(moves);

        characterNameElement.textContent =
            characters[selectedCharacter].name;
    };

    const updatePreviewState = (isVisible) => {
        previewCard.classList.toggle(
            'is-visible',
            isVisible
        );

        layout.classList.toggle(
            'preview-visible',
            isVisible
        );

        previewButton.setAttribute(
            'aria-pressed',
            String(isVisible)
        );

        previewButton.textContent = isVisible
            ? 'Ocultar imagem'
            : 'Ver imagem';
    };

    const updateCharacterButtons = () => {
        characterButtons.forEach((button) => {
            const isActive =
                button.dataset.puzzleCharacter ===
                selectedCharacter;

            button.classList.toggle(
                'active',
                isActive
            );

            button.setAttribute(
                'aria-pressed',
                String(isActive)
            );
        });
    };

    const finishPuzzle = () => {
        board.classList.add('is-complete');
        messageElement.classList.add('success');

        messageElement.textContent =
            `Parabéns! Você completou o quebra-cabeça ` +
            `de ${characters[selectedCharacter].name} ` +
            `em ${moves} movimentos!`;
    };

    const renderBoard = () => {
        board.innerHTML = '';
        board.classList.toggle(
            'is-complete',
            isSolved() && moves > 0
        );

        currentOrder.forEach(
            (tileIndex, position) => {
                const piece =
                    document.createElement('button');

                const column = tileIndex % 3;
                const row = Math.floor(tileIndex / 3);

                piece.type = 'button';
                piece.className = 'puzzle-piece';
                piece.dataset.position =
                    String(position);
                piece.dataset.tile =
                    String(tileIndex);

                piece.style.backgroundImage =
                    `url("${puzzleImageSource}")`;

                piece.style.backgroundPosition =
                    `${column * 50}% ${row * 50}%`;

                piece.setAttribute(
                    'aria-label',
                    `Peça ${position + 1} do ` +
                    `quebra-cabeça.`
                );

                if (position === selectedPosition) {
                    piece.classList.add(
                        'is-selected'
                    );
                }

                if (position === tileIndex) {
                    piece.classList.add(
                        'is-correct'
                    );
                }

                piece.addEventListener(
                    'click',
                    () => {
                        handlePieceClick(position);
                    }
                );

                board.appendChild(piece);
            }
        );
    };

    const resetMessage = () => {
        messageElement.textContent = '';
        messageElement.classList.remove('success');
        board.classList.remove('is-complete');
    };

    const shufflePuzzle = () => {
        selectedPosition = null;
        moves = 0;
        resetMessage();

        let newOrder = [...solvedOrder];
        let attempts = 0;

        do {
            newOrder = shuffle(solvedOrder);
            attempts += 1;
        } while (
            (
                newOrder.every(
                    (tileIndex, position) =>
                        tileIndex === position
                ) ||
                countWrongPieces(newOrder) < 6
            ) &&
            attempts < 80
        );

        currentOrder = newOrder;

        updateStatus();
        renderBoard();
    };

    function handlePieceClick(position) {
        if (isSolved() && moves > 0) {
            return;
        }

        if (selectedPosition === null) {
            selectedPosition = position;
            renderBoard();
            return;
        }

        if (selectedPosition === position) {
            selectedPosition = null;
            renderBoard();
            return;
        }

        [
            currentOrder[selectedPosition],
            currentOrder[position]
        ] = [
            currentOrder[position],
            currentOrder[selectedPosition]
        ];

        selectedPosition = null;
        moves += 1;

        updateStatus();
        renderBoard();

        if (isSolved()) {
            finishPuzzle();
        }
    }

    const loadImage = (source) =>
        new Promise((resolve, reject) => {
            const image = new Image();

            image.addEventListener(
                'load',
                () => resolve(image),
                { once: true }
            );

            image.addEventListener(
                'error',
                () => reject(
                    new Error(
                        `Não foi possível carregar ${source}`
                    )
                ),
                { once: true }
            );

            image.src = source;
        });

    const removeConnectedLightBackground = (
        canvas,
        context
    ) => {
        const width = canvas.width;
        const height = canvas.height;

        let imageData;

        try {
            imageData = context.getImageData(
                0,
                0,
                width,
                height
            );
        } catch {
            return;
        }

        const data = imageData.data;
        const visited = new Uint8Array(
            width * height
        );
        const queue = new Int32Array(
            width * height
        );

        let head = 0;
        let tail = 0;

        const isRemovable = (index) => {
            const offset = index * 4;
            const alpha = data[offset + 3];

            if (alpha < 15) {
                return true;
            }

            const red = data[offset];
            const green = data[offset + 1];
            const blue = data[offset + 2];
            const highest = Math.max(
                red,
                green,
                blue
            );
            const lowest = Math.min(
                red,
                green,
                blue
            );

            return (
                red >= 245 &&
                green >= 245 &&
                blue >= 245 &&
                highest - lowest <= 12
            );
        };

        const add = (index) => {
            if (
                index < 0 ||
                index >= visited.length ||
                visited[index] ||
                !isRemovable(index)
            ) {
                return;
            }

            visited[index] = 1;
            queue[tail] = index;
            tail += 1;
        };

        for (let x = 0; x < width; x += 1) {
            add(x);
            add((height - 1) * width + x);
        }

        for (let y = 0; y < height; y += 1) {
            add(y * width);
            add(y * width + width - 1);
        }

        while (head < tail) {
            const index = queue[head];

            head += 1;

            const x = index % width;
            const y = Math.floor(index / width);
            const offset = index * 4;

            data[offset + 3] = 0;

            if (x > 0) {
                add(index - 1);
            }

            if (x < width - 1) {
                add(index + 1);
            }

            if (y > 0) {
                add(index - width);
            }

            if (y < height - 1) {
                add(index + width);
            }
        }

        context.putImageData(imageData, 0, 0);
    };

    const findVisibleBounds = (
        canvas,
        context
    ) => {
        let imageData;

        try {
            imageData = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
        } catch {
            return {
                x: 0,
                y: 0,
                width: canvas.width,
                height: canvas.height
            };
        }

        const data = imageData.data;

        let minX = canvas.width;
        let minY = canvas.height;
        let maxX = -1;
        let maxY = -1;

        for (
            let y = 0;
            y < canvas.height;
            y += 1
        ) {
            for (
                let x = 0;
                x < canvas.width;
                x += 1
            ) {
                const alpha =
                    data[
                        (y * canvas.width + x) *
                            4 +
                            3
                    ];

                if (alpha > 20) {
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        if (maxX < minX || maxY < minY) {
            return {
                x: 0,
                y: 0,
                width: canvas.width,
                height: canvas.height
            };
        }

        return {
            x: minX,
            y: minY,
            width: maxX - minX + 1,
            height: maxY - minY + 1
        };
    };

    const createPuzzleArtwork = async (
        character
    ) => {
        const image = await loadImage(
            character.image
        );

        const maximumSourceSize = 1100;
        const naturalWidth =
            image.naturalWidth || image.width;
        const naturalHeight =
            image.naturalHeight || image.height;
        const sourceScale = Math.min(
            1,
            maximumSourceSize /
                Math.max(
                    naturalWidth,
                    naturalHeight
                )
        );

        const sourceCanvas =
            document.createElement('canvas');

        sourceCanvas.width = Math.max(
            1,
            Math.round(
                naturalWidth * sourceScale
            )
        );

        sourceCanvas.height = Math.max(
            1,
            Math.round(
                naturalHeight * sourceScale
            )
        );

        const sourceContext =
            sourceCanvas.getContext('2d', {
                willReadFrequently: true
            });

        if (!sourceContext) {
            return character.image;
        }

        sourceContext.drawImage(
            image,
            0,
            0,
            sourceCanvas.width,
            sourceCanvas.height
        );

        removeConnectedLightBackground(
            sourceCanvas,
            sourceContext
        );

        const bounds = findVisibleBounds(
            sourceCanvas,
            sourceContext
        );

        const artworkCanvas =
            document.createElement('canvas');

        artworkCanvas.width = 900;
        artworkCanvas.height = 900;

        const artworkContext =
            artworkCanvas.getContext('2d');

        if (!artworkContext) {
            return character.image;
        }

        const gradient =
            artworkContext.createLinearGradient(
                0,
                0,
                900,
                900
            );

        gradient.addColorStop(
            0,
            character.colors[0]
        );

        gradient.addColorStop(
            0.52,
            character.colors[1]
        );

        gradient.addColorStop(
            1,
            character.colors[2]
        );

        artworkContext.fillStyle = gradient;
        artworkContext.fillRect(0, 0, 900, 900);

        const circles = [
            [105, 120, 74, '#ffffff66'],
            [785, 115, 105, '#ffffff55'],
            [780, 760, 125, '#8f22d426'],
            [120, 765, 95, '#20bfe32b'],
            [455, 90, 38, '#ffe11599'],
            [465, 810, 45, '#ff82c67a']
        ];

        circles.forEach(
            ([x, y, radius, color]) => {
                artworkContext.beginPath();
                artworkContext.arc(
                    x,
                    y,
                    radius,
                    0,
                    Math.PI * 2
                );
                artworkContext.fillStyle = color;
                artworkContext.fill();
            }
        );

        artworkContext.save();
        artworkContext.translate(450, 450);
        artworkContext.rotate(-0.09);
        artworkContext.strokeStyle =
            '#ffffff70';
        artworkContext.lineWidth = 28;
        artworkContext.strokeRect(
            -310,
            -310,
            620,
            620
        );
        artworkContext.restore();

        const availableWidth = 690;
        const availableHeight = 690;
        const scale = Math.min(
            availableWidth / bounds.width,
            availableHeight / bounds.height
        );

        const drawWidth =
            bounds.width * scale;
        const drawHeight =
            bounds.height * scale;
        const drawX =
            (900 - drawWidth) / 2;
        const drawY =
            (900 - drawHeight) / 2 + 25;

        artworkContext.save();
        artworkContext.shadowColor =
            'rgba(32, 58, 101, 0.28)';
        artworkContext.shadowBlur = 24;
        artworkContext.shadowOffsetY = 18;

        artworkContext.drawImage(
            sourceCanvas,
            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height,
            drawX,
            drawY,
            drawWidth,
            drawHeight
        );

        artworkContext.restore();

        return artworkCanvas.toDataURL(
            'image/png'
        );
    };

    const setCharacter = async (
        characterKey
    ) => {
        const character =
            characters[characterKey];

        if (!character) {
            return;
        }

        selectedCharacter = characterKey;
        puzzleImageSource = character.image;

        updateCharacterButtons();
        updateStatus();

        previewImage.src = character.image;
        previewImage.alt =
            `Imagem completa de ${character.name}`;

        shufflePuzzle();

        const currentToken =
            artworkToken + 1;

        artworkToken = currentToken;
        board.setAttribute(
            'aria-busy',
            'true'
        );

        try {
            const artwork =
                await createPuzzleArtwork(
                    character
                );

            if (
                currentToken !== artworkToken ||
                selectedCharacter !==
                    characterKey
            ) {
                return;
            }

            puzzleImageSource = artwork;
            previewImage.src = artwork;
            renderBoard();
        } catch (error) {
            console.warn(
                'O quebra-cabeça usará a imagem original.',
                error
            );
        } finally {
            if (currentToken === artworkToken) {
                board.setAttribute(
                    'aria-busy',
                    'false'
                );
            }
        }
    };

    openButton.addEventListener(
        'click',
        () => {
            section.classList.remove(
                'game-hidden'
            );

            section.classList.add(
                'is-visible'
            );

            if (!gameBuilt) {
                gameBuilt = true;
                setCharacter(selectedCharacter);
            }

            window.setTimeout(() => {
                scrollToElement(section);
            }, 50);
        }
    );

    closeButton.addEventListener(
        'click',
        () => {
            section.classList.remove(
                'is-visible'
            );

            section.classList.add(
                'game-hidden'
            );

            updatePreviewState(false);

            scrollToElement(
                document.getElementById('jogos')
            );
        }
    );

    shuffleButton.addEventListener(
        'click',
        shufflePuzzle
    );

    previewButton.addEventListener(
        'click',
        () => {
            updatePreviewState(
                !previewCard.classList.contains(
                    'is-visible'
                )
            );
        }
    );

    characterButtons.forEach((button) => {
        button.addEventListener(
            'click',
            () => {
                const characterKey =
                    button.dataset
                        .puzzleCharacter;

                if (
                    !characterKey ||
                    characterKey ===
                        selectedCharacter
                ) {
                    return;
                }

                setCharacter(characterKey);
            }
        );
    });

    updateCharacterButtons();
    updateStatus();
    updatePreviewState(false);
}

/* =========================================================
   JOGO DE COLORIR
========================================================= */

function initializeColoringGame() {
    const canvas = document.getElementById('coloringCanvas');
    const characterButtons = document.querySelectorAll(
        '.coloring-character'
    );
    const colorButtons = document.querySelectorAll(
        '.color-option'
    );
    const customColor = document.getElementById('customColor');
    const brushSize = document.getElementById('brushSize');
    const clearButton = document.getElementById(
        'clearColoringButton'
    );
    const printButton = document.getElementById(
        'printColoringButton'
    );
    const saveButton = document.getElementById(
        'saveColoringButton'
    );

    if (
        !(canvas instanceof HTMLCanvasElement) ||
        characterButtons.length === 0 ||
        !customColor ||
        !brushSize ||
        !clearButton ||
        !printButton ||
        !saveButton
    ) {
        return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
        return;
    }

    const characters = {
        popit: {
            name: 'Capitão Pop It',
            fileName: 'capitao-pop-it',
            image: 'img/personagens/popit.png'
        },

        'miss-pop': {
            name: 'Miss Pop',
            fileName: 'miss-pop',
            image: 'img/personagens/miss-pop.png'
        },

        gelecao: {
            name: 'Gelecão',
            fileName: 'gelecao',
            image: 'img/personagens/gelecao.png'
        },

        'dog-doug': {
            name: 'Dog Doug',
            fileName: 'dog-doug',
            image: 'img/personagens/dog-doug.png'
        }
    };

    let selectedCharacter = 'popit';
    let selectedColor = '#8f22d4';
    let isDrawing = false;
    let currentImage = null;

    const getCanvasPosition = (event) => {
        const rectangle = canvas.getBoundingClientRect();

        return {
            x:
                (event.clientX - rectangle.left) *
                (canvas.width / rectangle.width),

            y:
                (event.clientY - rectangle.top) *
                (canvas.height / rectangle.height)
        };
    };

    const drawBaseImage = () => {
        context.save();

        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        context.fillStyle = '#ffffff';

        context.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        if (currentImage) {
            const availableWidth = canvas.width * 0.82;
            const availableHeight = canvas.height * 0.82;

            const scale = Math.min(
                availableWidth / currentImage.naturalWidth,
                availableHeight / currentImage.naturalHeight
            );

            const width = currentImage.naturalWidth * scale;
            const height = currentImage.naturalHeight * scale;
            const x = (canvas.width - width) / 2;
            const y = (canvas.height - height) / 2;

            context.globalAlpha = 0.28;
            context.filter = 'grayscale(1) contrast(1.35)';

            context.drawImage(
                currentImage,
                x,
                y,
                width,
                height
            );

            context.filter = 'none';
            context.globalAlpha = 1;
        }

        context.restore();
    };

    const loadCharacter = (characterKey) => {
        const character = characters[characterKey];

        if (!character) {
            return;
        }

        selectedCharacter = characterKey;

        const image = new Image();

        image.addEventListener('load', () => {
            currentImage = image;
            drawBaseImage();
        });

        image.addEventListener('error', () => {
            currentImage = null;

            context.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            context.fillStyle = '#ffffff';

            context.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            context.fillStyle = '#25324a';
            context.font = 'bold 24px Arial';
            context.textAlign = 'center';

            context.fillText(
                'Não foi possível carregar o personagem.',
                canvas.width / 2,
                canvas.height / 2
            );
        });

        image.src = character.image;
    };

    const startDrawing = (event) => {
        if (
            typeof event.button === 'number' &&
            event.button !== 0
        ) {
            return;
        }

        event.preventDefault();

        isDrawing = true;

        if (
            typeof canvas.setPointerCapture === 'function' &&
            typeof event.pointerId === 'number'
        ) {
            canvas.setPointerCapture(event.pointerId);
        }

        const position = getCanvasPosition(event);

        context.beginPath();
        context.moveTo(position.x, position.y);
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = selectedColor;
        context.lineWidth = Number(brushSize.value);
        context.lineTo(
            position.x + 0.01,
            position.y + 0.01
        );
        context.stroke();
    };

    const continueDrawing = (event) => {
        if (!isDrawing) {
            return;
        }

        event.preventDefault();

        const position = getCanvasPosition(event);

        context.lineTo(position.x, position.y);
        context.stroke();
    };

    const stopDrawing = (event) => {
        if (!isDrawing) {
            return;
        }

        isDrawing = false;
        context.closePath();

        if (
            event &&
            typeof event.pointerId === 'number' &&
            typeof canvas.releasePointerCapture === 'function'
        ) {
            try {
                canvas.releasePointerCapture(event.pointerId);
            } catch {
                // O ponteiro pode já ter sido liberado.
            }
        }
    };

    canvas.addEventListener('pointerdown', startDrawing);
    canvas.addEventListener('pointermove', continueDrawing);
    canvas.addEventListener('pointerup', stopDrawing);
    canvas.addEventListener('pointercancel', stopDrawing);

    canvas.addEventListener('pointerleave', (event) => {
        if (event.buttons === 0) {
            stopDrawing(event);
        }
    });

    characterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            characterButtons.forEach((item) => {
                item.classList.remove('active');
            });

            button.classList.add('active');

            loadCharacter(
                button.dataset.coloringCharacter
            );
        });
    });

    colorButtons.forEach((button) => {
        button.addEventListener('click', () => {
            selectedColor =
                button.dataset.color || selectedColor;

            customColor.value = selectedColor;

            colorButtons.forEach((item) => {
                item.classList.remove('active');
            });

            button.classList.add('active');
        });
    });

    customColor.addEventListener('input', () => {
        selectedColor = customColor.value;

        colorButtons.forEach((item) => {
            item.classList.remove('active');
        });
    });

    clearButton.addEventListener('click', drawBaseImage);

    saveButton.addEventListener('click', () => {
        const character = characters[selectedCharacter];
        const link = document.createElement('a');

        try {
            link.href = canvas.toDataURL('image/png');
        } catch (error) {
            console.error(
                'Não foi possível salvar o desenho:',
                error
            );
            window.alert(
                'Não foi possível salvar o desenho.'
            );
            return;
        }

        link.download =
            `desenho-${character.fileName}.png`;

        document.body.appendChild(link);
        link.click();
        link.remove();
    });

    printButton.addEventListener('click', () => {
        const character = characters[selectedCharacter];
        let imageData = '';

        try {
            imageData = canvas.toDataURL('image/png');
        } catch (error) {
            console.error(
                'Não foi possível preparar a impressão:',
                error
            );
            window.print();
            return;
        }

        const printWindow = window.open(
            '',
            '_blank',
            'width=900,height=760'
        );

        if (!printWindow) {
            window.print();
            return;
        }

        printWindow.document.open();

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>
                    Desenho para colorir -
                    ${escapeHtml(character.name)}
                </title>

                <style>
                    * {
                        box-sizing: border-box;
                    }

                    body {
                        margin: 0;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                        text-align: center;
                        background: #ffffff;
                    }

                    h1 {
                        margin: 0 0 18px;
                        font-size: 24px;
                    }

                    img {
                        display: block;
                        width: 100%;
                        max-width: 800px;
                        height: auto;
                        margin: 0 auto;
                    }

                    @media print {
                        body {
                            padding: 0;
                        }
                    }
                </style>
            </head>

            <body>
                <h1>${escapeHtml(character.name)}</h1>

                <img
                    src="${imageData}"
                    alt="Desenho de ${escapeHtml(
                        character.name
                    )}"
                >
            </body>
            </html>
        `);

        printWindow.document.close();

        window.setTimeout(() => {
            printWindow.focus();
            printWindow.print();
        }, 400);
    });

    if (colorButtons[0]) {
        colorButtons[0].classList.add('active');
    }

    loadCharacter(selectedCharacter);
}
