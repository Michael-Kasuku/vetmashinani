(function () {
    "use strict";

    /**
     * Mobile navigation toggle.
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle') as HTMLElement | null;

    function toggleMobileNav(): void {
        try {
            document.body.classList.toggle('mobile-nav-active');
            if (mobileNavToggleBtn) {
                mobileNavToggleBtn.classList.toggle('bi-list');
                mobileNavToggleBtn.classList.toggle('bi-x');
            }
        } catch (error) {
            console.error('Error in toggleMobileNav:', error);
        }
    }

    if (mobileNavToggleBtn) {
        mobileNavToggleBtn.addEventListener('click', toggleMobileNav);
    }

    /**
     * Hide mobile nav on same-page/hash links.
     */
    document.querySelectorAll<HTMLAnchorElement>('#navmenu a').forEach(navItem => {
        navItem.addEventListener('click', () => {
            if (document.body.classList.contains('mobile-nav-active')) {
                toggleMobileNav();
            }
        });
    });

    /**
     * Toggle mobile nav dropdowns.
     */
    document.querySelectorAll<HTMLElement>('.navmenu .toggle-dropdown').forEach(dropdownToggle => {
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            try {
                const parentItem = this.parentNode as HTMLElement;
                parentItem.classList.toggle('active');
                const sibling = parentItem.nextElementSibling as HTMLElement | null;
                if (sibling) {
                    sibling.classList.toggle('dropdown-active');
                }
                e.stopImmediatePropagation();
            } catch (error) {
                console.error('Error in toggleDropdown:', error);
            }
        });
    });

    /**
     * Preloader handling.
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            try {
                preloader.remove();
            } catch (error) {
                console.error('Error removing preloader:', error);
            }
        });
    }

    /**
     * Scroll to top button functionality.
     */
    const scrollTopBtn = document.querySelector('.scroll-top') as HTMLElement | null;

    function toggleScrollTopButton(): void {
        try {
            if (scrollTopBtn) {
                scrollTopBtn.classList.toggle('active', window.scrollY > 100);
            }
        } catch (error) {
            console.error('Error in toggleScrollTopButton:', error);
        }
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    window.addEventListener('load', toggleScrollTopButton);
    document.addEventListener('scroll', toggleScrollTopButton);

    /**
     * Smooth scroll for navigation links.
     */
    document.querySelectorAll<HTMLAnchorElement>('a.scroll-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                const targetId = link.getAttribute('href')?.substring(1);
                const targetElement = document.getElementById(targetId || '');
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error('Error in smooth scroll:', error);
            }
        });
    });

    /**
     * Tooltip functionality.
     */
    document.querySelectorAll<HTMLElement>('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function () {
            try {
                const tooltipText = this.getAttribute('data-tooltip') || '';
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.innerText = tooltipText;
                document.body.appendChild(tooltip);

                const rect = this.getBoundingClientRect();
                tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight}px`;
                tooltip.style.left = `${rect.left + (this.offsetWidth / 2) - (tooltip.offsetWidth / 2)}px`;

                (this as any)._tooltip = tooltip; // Store tooltip reference for removal later
            } catch (error) {
                console.error('Error in tooltip mouseenter:', error);
            }
        });

        element.addEventListener('mouseleave', function () {
            try {
                const tooltip = (this as any)._tooltip as HTMLElement;
                if (tooltip) {
                    tooltip.remove();
                    delete (this as any)._tooltip; // Remove reference
                }
            } catch (error) {
                console.error('Error in tooltip mouseleave:', error);
            }
        });
    });
})();
