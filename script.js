document.addEventListener('DOMContentLoaded', () => {

    const buttons =
        document.querySelectorAll('.sidebar-item');

    const sections =
        document.querySelectorAll('.command-section');

    const search =
        document.getElementById('command-search');

    const noResults =
        document.getElementById('no-results');

    const commandTotal =
        document.getElementById('command-total');

    let currentCategory =
        'category-all';

    if (commandTotal) {
        commandTotal.textContent =
            document.querySelectorAll(
                '#category-all .command-card'
            ).length;
    }

    function selectCategory(categoryId) {

        currentCategory = categoryId;

        buttons.forEach(button => {

            button.classList.toggle(
                'active',
                button.dataset.category === categoryId
            );

        });

        sections.forEach(section => {

            section.classList.toggle(
                'active',
                section.id === categoryId
            );

        });

        document
            .querySelectorAll('.command-card')
            .forEach(card => {
                card.classList.remove('hidden');
            });

        if (noResults) {
            noResults.classList.remove('visible');
        }
    }

    buttons.forEach(button => {

        button.addEventListener(
            'click',
            () => {

                if (search) {
                    search.value = '';
                }

                selectCategory(
                    button.dataset.category
                );
            }
        );

    });

    if (search) {

        search.addEventListener(
            'input',
            () => {

                const query =
                    search.value
                        .trim()
                        .toLowerCase();

                if (!query) {

                    selectCategory(
                        currentCategory
                    );

                    return;
                }

                const allSection =
                    document.getElementById(
                        'category-all'
                    );

                if (!allSection) {
                    return;
                }

                let found = false;

                document
                    .querySelectorAll(
                        '.command-section'
                    )
                    .forEach(section => {

                        section.classList.remove(
                            'active'
                        );

                    });

                const cards =
                    allSection.querySelectorAll(
                        '.command-card'
                    );

                cards.forEach(card => {

                    const name =
                        card.dataset.name || '';

                    const description =
                        card.dataset.description || '';

                    const matches =
                        name.includes(query) ||
                        description.includes(query);

                    card.classList.toggle(
                        'hidden',
                        !matches
                    );

                    if (matches) {
                        found = true;
                    }

                });

                allSection.classList.add(
                    'active'
                );

                buttons.forEach(button => {

                    button.classList.toggle(
                        'active',
                        button.dataset.category ===
                            'category-all'
                    );

                });

                if (noResults) {

                    noResults.classList.toggle(
                        'visible',
                        !found
                    );

                }

            }
        );

        document.addEventListener(
            'keydown',
            event => {

                if (
                    (event.ctrlKey || event.metaKey) &&
                    event.key.toLowerCase() === 'k'
                ) {
                    event.preventDefault();

                    search.focus();
                }

                if (event.key === 'Escape') {

                    search.value = '';

                    selectCategory(
                        currentCategory
                    );

                    search.blur();
                }

            }
        );

    }

    const cards =
        document.querySelectorAll(
            '.feature-card'
        );

    if (!cards.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = '1';

                    entry.target.style.transform =
                        'translateY(0)';

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.1
            }
        );

    cards.forEach(card => {

        card.style.opacity = '0';

        card.style.transform =
            'translateY(15px)';

        card.style.transition =
            'opacity 0.6s ease, transform 0.6s ease';

        observer.observe(card);

    });

});
