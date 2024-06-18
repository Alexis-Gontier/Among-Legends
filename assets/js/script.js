document.addEventListener('DOMContentLoaded', () => {
    const selectRoles = document.querySelectorAll('.roles select');
    let roles = new Array(5).fill(null);

    selectRoles.forEach(select => {
        select.addEventListener('change', () => {
            const selectedValue = select.value;

            if (selectedValue !== '') {
                const index = parseInt(select.id.slice(-1)) - 1;
                roles[index] = selectedValue;
            } else {
                const index = parseInt(select.id.slice(-1)) - 1;
                roles[index] = null;
            }

            console.log(roles);
        });
    });
});


function hashCode(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return hash;
}

function shuffleRoles(seed, roles) {
    const shuffledRoles = [...roles];
    let hash = hashCode(seed);
    for (let i = shuffledRoles.length - 1; i > 0; i--) {
        const j = Math.abs(hash % (i + 1));
        [shuffledRoles[i], shuffledRoles[j]] = [shuffledRoles[j], shuffledRoles[i]];
        hash = Math.floor(hash / (i + 1));
    }
    return shuffledRoles;
}


function generateRoles() {
    const seed = document.getElementById('seed').value;
    if (!seed) {
        alert('Veuillez entrer une seed.');
        return;
    }
    const selectedRoles = Array.from(document.querySelectorAll('.roles select'))
        .map(select => select.value)
        .filter(value => value !== '');

    if (selectedRoles.length !== 5) {
        alert('Veuillez sélectionner 5 rôles.');
        return;
    }


    selectedRoles.sort();

    const shuffledRoles = shuffleRoles(seed, selectedRoles);
    const rolesDiv = document.getElementById('roles');
    rolesDiv.innerHTML = '';
    shuffledRoles.forEach(role => {
        const roleDiv = document.createElement('div');
        roleDiv.className = 'role';
        roleDiv.innerText = 'Cliquez pour révéler';
        roleDiv.style.cursor = 'pointer';
        roleDiv.dataset.role = role;
        roleDiv.addEventListener('click', function reveal() {
            revealRole(roleDiv);
        });
        rolesDiv.appendChild(roleDiv);
    });
}

function revealRole(clickedDiv) {

    clickedDiv.innerText = clickedDiv.dataset.role;
    clickedDiv.style.cursor = 'default';

    const roleDivs = document.querySelectorAll('.role');
    roleDivs.forEach(div => {
        div.removeEventListener('click', revealRole);
        if (div !== clickedDiv) {
            div.style.cursor = 'default';
            div.style.color = 'transparent';
            div.style.background = 'rgb(119, 119, 119)';
        }
    });
}
