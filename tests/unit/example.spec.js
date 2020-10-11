import { shallowMount, createLocalVue } from '@vue/test-utils';
var FooterNavigation=   FooterNavigation from '../../src/components/FooterNavigation/FooterNavigation.vue';

// const localVue = createLocalVue();
// localVue.component('font-awesome-icon', FontAwesomeIcon);

describe('FooterNavigation.vue', () => {
    const wrapper = mount(FooterNavigation);

    // it('renders props.msg when passed', () => {
    //     const msg = 'new message';
    //     const wrapper = shallowMount(FooterNavigation, {
    //         propsData: { msg },
    //     });
    //     expect(wrapper.text()).toMatch(msg);
    // });

    it('отображает корректную разметку', () => {
        expect(wrapper.html()).toContain('<div class="footer-inner"></div>');
    });
});
