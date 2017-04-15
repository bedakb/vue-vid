import Vue from 'vue'
import VueVid from '@/components/VueVid'

// Helper function 
function getComp(Component, propsData) {
    let Ctor = Vue.extend(Component)
    const el = document.createElement('DIV')
    return new Ctor({propsData, el})
}

describe('VueVid.vue', () => {

    it('sets correct default data', () => {
        expect(typeof VueVid.data).to.equal('function')
        const defaultData = VueVid.data()
        expect(defaultData.isPlaying).to.equal(false)
        expect(defaultData.progressActivity).to.equal(0)
        expect(defaultData.volumeValue).to.equal(1)
        expect(defaultData.playbackRateValue).to.equal(1)
        expect(defaultData.isMouseDown).to.equal(false)
    })

    it('renders main div element with class `.VueVid`', () => {
        const vm = getComp(VueVid)
        const el = vm.$el.querySelector('.VueVid')
        expect(el).not.to.be.undefined
    })

    it('renders video element if string is passed', () => {
        const vm = getComp(VueVid, {
            sources: 'video/string.mp4'
        })
        const el = vm.$el.querySelector('.VueVid__video video')
        expect(el).not.to.be.undefined
    })

    it('renders video element if array is passed', () => {
        const vm = getComp(VueVid, {
            sources: ['video/array.mp4', 'video/array.ogg']
        })
        const el = vm.$el.querySelector('.VueVid__video video')
        expect(el).not.to.be.undefined
    })

    it('plays video when instance is mounted if `autoPlay` is true', () => {
        const spy = sinon.spy(VueVid.methods, 'togglePlay')
        const vm = getComp(VueVid, {
            autoPlay: true
        })
        expect(spy).to.have.been.called.once
    })

    it('gets correct mime type', () => {
        const path = 'video/video.mp4'
        const mimeType = 'mp4'
        expect(VueVid.methods.getType(path)).to.equal(mimeType)
    })

})
