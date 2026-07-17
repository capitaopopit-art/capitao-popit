'use strict';

/* =========================================================
   CAPITÃO POP IT
   ARQUIVO: script.js
   VERSÃO CORRIGIDA
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const initializers = [
        initializeCurrentYear,
        initializeMobileMenu,
        initializeBackToTop,
        initializeCharacterModal,
        initializeStoryModal,
        initializeInteractiveStory,
        initializeGameNavigation,
        initializeMemoryGame,
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
});

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
   JOGO DA MEMÓRIA
========================================================= */

function initializeMemoryGame() {
    const section = document.getElementById(
        'memoryGameSection'
    );
    const board = document.getElementById('memoryBoard');
    const movesElement = document.getElementById(
        'memoryMoves'
    );
    const pairsElement = document.getElementById(
        'memoryPairs'
    );
    const messageElement = document.getElementById(
        'memoryMessage'
    );
    const closeButton = document.getElementById(
        'closeMemoryGameButton'
    );
    const restartButton = document.getElementById(
        'restartMemoryGameButton'
    );
    const openButton = document.querySelector(
        '[data-game="memory"]'
    );

    if (
        !section ||
        !board ||
        !movesElement ||
        !pairsElement ||
        !messageElement ||
        !closeButton ||
        !restartButton ||
        !openButton
    ) {
        return;
    }

    const characters = [
        {
            key: 'popit',
            name: 'Capitão Pop It',
            image: 'img/personagens/popit.png'
        },
        {
            key: 'miss-pop',
            name: 'Miss Pop',
            image: 'img/personagens/miss-pop.png'
        },
        {
            key: 'lia',
            name: 'Lia',
            image: 'img/personagens/lia.png'
        },
        {
            key: 'max',
            name: 'Max',
            image: 'img/personagens/max.png'
        },
        {
            key: 'gelecao',
            name: 'Gelecão',
            image: 'img/personagens/gelecao.png'
        },
        {
            key: 'cloud',
            name: 'Cloud',
            image: 'img/personagens/cloud.png'
        },
        {
            key: 'helio',
            name: 'Balão Hélio',
            image: 'img/personagens/helio-balao.png'
        },
        {
            key: 'dog-doug',
            name: 'Dog Doug',
            image: 'img/personagens/dog-doug.png'
        }
    ];

    let firstCard = null;
    let secondCard = null;
    let locked = false;
    let moves = 0;
    let matchedPairs = 0;
    let totalPairs = 0;
    let gameBuilt = false;

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
        pairsElement.textContent = String(matchedPairs);
    };

    const resetSelection = () => {
        firstCard = null;
        secondCard = null;
        locked = false;
    };

    const finishGame = () => {
        messageElement.textContent =
            `Parabéns! Você encontrou os ${totalPairs} pares ` +
            `em ${moves} jogadas!`;
    };

    const compareCards = () => {
        if (!firstCard || !secondCard) {
            return;
        }

        const isMatch =
            firstCard.dataset.character ===
            secondCard.dataset.character;

        if (isMatch) {
            firstCard.classList.add('is-matched');
            secondCard.classList.add('is-matched');

            matchedPairs += 1;
            updateStatus();
            resetSelection();

            if (matchedPairs === totalPairs) {
                finishGame();
            }

            return;
        }

        window.setTimeout(() => {
            firstCard.classList.remove('is-flipped');
            secondCard.classList.remove('is-flipped');
            resetSelection();
        }, 850);
    };

    const handleCardClick = (card) => {
        if (
            locked ||
            card === firstCard ||
            card.classList.contains('is-matched')
        ) {
            return;
        }

        card.classList.add('is-flipped');

        if (!firstCard) {
            firstCard = card;
            return;
        }

        secondCard = card;
        locked = true;
        moves += 1;

        updateStatus();
        compareCards();
    };

    const buildGame = () => {
        firstCard = null;
        secondCard = null;
        locked = false;
        moves = 0;
        matchedPairs = 0;
        messageElement.textContent = '';

        const selectedCharacters = shuffle(characters).slice(
            0,
            6
        );

        totalPairs = selectedCharacters.length;

        const cards = shuffle(
            selectedCharacters.flatMap((character) => [
                {
                    ...character,
                    copy: 1
                },
                {
                    ...character,
                    copy: 2
                }
            ])
        );

        board.innerHTML = '';

        cards.forEach((character, index) => {
            const card = document.createElement('button');

            card.type = 'button';
            card.className = 'memory-card';
            card.dataset.character = character.key;
            card.setAttribute(
                'aria-label',
                `Carta ${index + 1}. Clique para virar.`
            );

            card.innerHTML = `
                <span class="memory-card-inner">
                    <span
                        class="memory-card-front"
                        aria-hidden="true"
                    ></span>

                    <span class="memory-card-back">
                        <img
                            src="${character.image}"
                            alt="${escapeHtml(character.name)}"
                            draggable="false"
                        >
                    </span>
                </span>
            `;

            card.addEventListener('click', () => {
                handleCardClick(card);
            });

            board.appendChild(card);
        });

        updateStatus();
        gameBuilt = true;
    };

    openButton.addEventListener('click', () => {
        section.classList.remove('game-hidden');
        section.classList.add('is-visible');

        if (!gameBuilt) {
            buildGame();
        }

        window.setTimeout(() => {
            scrollToElement(section);
        }, 50);
    });

    closeButton.addEventListener('click', () => {
        section.classList.remove('is-visible');
        section.classList.add('game-hidden');
        scrollToElement(document.getElementById('jogos'));
    });

    restartButton.addEventListener('click', buildGame);
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
