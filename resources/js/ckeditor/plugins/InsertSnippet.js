
/**
 * @var Nova
 */
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
export default class InsertSnippet{

    constructor( editor ) {
        this.config = editor.config;
        this.model = editor.model;
        this.data = editor.data;
        this.ui = editor.ui;
    }

    /**
     * Get Required Children
     * @inheritDoc
     */
    static get requires() {
        return []
    }

    /**
     * Get the Plugin Name
     * @inheritDoc
     */
    static get pluginName() {
        return 'insertSnippet'
    }

    /**
     * Is the plugin enabled?
     * @return {boolean}
     */
    get isEnabled(){
        return this.config.get('snippetBrowser')
    }

    /**
     * Get the Nova field name.
     * @return {boolean}
     */
    get fieldName(){
        return this.config.get('fieldName')
    }

    /**
     * Initialize the plugin.
     * Start listening for events.
     * @return void
     */
    init() {
        this.ui.componentFactory.add('insertSnippet', this.createButton.bind(this))
        Nova.$on(`ckeditor:snippets:${this.fieldName}:write`, this.writeContent.bind(this))
    }

    /**
     * Destroy Instance
     * Stop listening for events.
     * @return void
     */
    destroy() {
        Nova.$off(`ckeditor:snippets:${this.fieldName}:write`, this.writeContent.bind(this))
    }

    /**
     * Write Document Content.
     * @param locale object
     * @return {ButtonView}
     */
    createButton(locale){
        const view = new ButtonView(locale)
        view.set({
            label: 'Insert Snippet',
            icon: this.icon,
            tooltip: true,
        })
        if(this.isEnabled){
            view.on('execute', this.openModal.bind(this))
        }

        view.set('isVisible', this.isEnabled)
        return view
    }

    /**
     * Launch the Link Browser.
     */
    openModal(){
        Nova.$emit(`ckeditor:snippets:${this.fieldName}`)
    }

    /**
     * Write Document Content.
     * @return void
     */
    writeContent(snippet){
        this.model.insertContent( this.data.toModel( this.data.processor.toView( snippet ) ));
    }

    /**
     * Get the Icon
     * @return string
     */
    get icon(){
        return `<svg enable-background="new 0 0 297 297" viewBox="0 0 297 297" xmlns="http://www.w3.org/2000/svg"><path d="m253.571 16.535c-14.403 0-27.268 6.705-35.663 17.154-8.396-10.449-21.261-17.154-35.668-17.154-5.578 0-10.1 4.523-10.1 10.101 0 5.577 4.521 10.101 10.1 10.101 14.1 0 25.568 11.492 25.568 25.622v172.284c0 14.129-11.469 25.621-25.568 25.621-5.578 0-10.1 4.523-10.1 10.101 0 5.579 4.521 10.101 10.1 10.101 14.407 0 27.273-6.705 35.668-17.154 8.395 10.449 21.26 17.154 35.663 17.154 5.579 0 10.101-4.521 10.101-10.101 0-5.577-4.522-10.101-10.101-10.101-14.094 0-25.562-11.492-25.562-25.621v-172.285c0-14.13 11.468-25.622 25.562-25.622 5.579 0 10.101-4.523 10.101-10.101 0-5.576-4.522-10.1-10.101-10.1z"/><path d="m286.9 213.052c-2.656 0-5.263 1.079-7.143 2.959-1.878 1.878-2.959 4.483-2.959 7.142 0 2.654 1.081 5.262 2.959 7.14 1.89 1.878 4.486 2.96 7.143 2.96 2.655 0 5.262-1.082 7.141-2.96 1.878-1.878 2.959-4.485 2.959-7.14 0-2.658-1.081-5.264-2.959-7.142-1.879-1.88-4.475-2.959-7.141-2.959z"/><path d="m44.704 213.052c-5.575 0-10.101 4.523-10.101 10.1 0 5.575 4.525 10.1 10.101 10.1 5.574 0 10.101-4.525 10.101-10.1 0-5.577-4.527-10.1-10.101-10.1z"/><path d="m252.307 213.052c-5.585 0-10.1 4.523-10.1 10.1 0 5.575 4.516 10.1 10.1 10.1 5.574 0 10.101-4.525 10.101-10.1-.001-5.577-4.527-10.1-10.101-10.1z"/><path d="m113.902 213.052c-5.576 0-10.1 4.523-10.1 10.1 0 5.575 4.524 10.1 10.1 10.1 5.585 0 10.1-4.525 10.1-10.1 0-5.577-4.515-10.1-10.1-10.1z"/><path d="m79.307 213.052c-5.585 0-10.099 4.523-10.099 10.1 0 5.575 4.514 10.1 10.099 10.1 5.577 0 10.101-4.525 10.101-10.1-.001-5.577-4.524-10.1-10.101-10.1z"/><path d="m148.505 213.052c-5.574 0-10.101 4.523-10.101 10.1 0 5.575 4.526 10.1 10.101 10.1s10.101-4.525 10.101-10.1c-.001-5.577-4.526-10.1-10.101-10.1z"/><path d="m183.098 233.252c5.587 0 10.101-4.525 10.101-10.1 0-5.577-4.514-10.1-10.101-10.1-5.574 0-10.1 4.523-10.1 10.1 0 5.575 4.525 10.1 10.1 10.1z"/><path d="m10.111 213.052c-2.667 0-5.273 1.079-7.152 2.959-1.878 1.878-2.949 4.483-2.949 7.142 0 2.654 1.071 5.262 2.949 7.14 1.89 1.878 4.485 2.96 7.152 2.96 2.655 0 5.252-1.082 7.139-2.96 1.88-1.878 2.962-4.485 2.962-7.14 0-2.658-1.082-5.264-2.962-7.142-1.877-1.88-4.483-2.959-7.139-2.959z"/><path d="m10.111 105.129c-5.586 0-10.101 4.515-10.101 10.09 0 5.587 4.516 10.1 10.101 10.1 5.574 0 10.101-4.514 10.101-10.1 0-5.575-4.527-10.09-10.101-10.09z"/><path d="m10.111 177.075c-5.586 0-10.101 4.523-10.101 10.099s4.516 10.101 10.101 10.101c5.574 0 10.101-4.524 10.101-10.101 0-5.576-4.527-10.099-10.101-10.099z"/><path d="m10.111 141.096c-5.586 0-10.101 4.525-10.101 10.101 0 5.587 4.516 10.101 10.101 10.101 5.574 0 10.101-4.514 10.101-10.101 0-5.576-4.527-10.101-10.101-10.101z"/><path d="m10.111 69.15c-2.656 0-5.263 1.072-7.152 2.951-1.878 1.888-2.959 4.484-2.959 7.15 0 2.656 1.081 5.252 2.959 7.142 1.89 1.879 4.485 2.959 7.152 2.959 2.655 0 5.252-1.08 7.139-2.959 1.88-1.89 2.962-4.485 2.962-7.142 0-2.666-1.082-5.262-2.962-7.149-1.887-1.879-4.493-2.952-7.139-2.952z"/><path d="m183.107 89.352c5.577 0 10.101-4.525 10.101-10.11 0-5.574-4.523-10.091-10.101-10.091-5.584 0-10.109 4.517-10.109 10.091 0 5.584 4.525 10.11 10.109 10.11z"/><path d="m79.307 69.15c-5.585 0-10.099 4.517-10.099 10.091 0 5.585 4.514 10.11 10.099 10.11 5.577 0 10.101-4.525 10.101-10.11-.001-5.574-4.524-10.091-10.101-10.091z"/><path d="m113.902 69.15c-5.576 0-10.1 4.517-10.1 10.091 0 5.585 4.524 10.11 10.1 10.11 5.585 0 10.1-4.525 10.1-10.11 0-5.574-4.515-10.091-10.1-10.091z"/><path d="m252.307 69.15c-5.585 0-10.1 4.517-10.1 10.091 0 5.585 4.516 10.11 10.1 10.11 5.574 0 10.101-4.525 10.101-10.11-.001-5.574-4.527-10.091-10.101-10.091z"/><path d="m44.704 69.15c-5.575 0-10.101 4.517-10.101 10.091 0 5.585 4.525 10.11 10.101 10.11 5.574 0 10.101-4.525 10.101-10.11 0-5.574-4.527-10.091-10.101-10.091z"/><path d="m148.505 69.15c-5.584 0-10.101 4.517-10.101 10.091 0 5.585 4.517 10.11 10.101 10.11 5.575 0 10.101-4.525 10.101-10.11-.001-5.574-4.526-10.091-10.101-10.091z"/><path d="m286.9 89.352c2.666 0 5.262-1.08 7.141-2.959 1.888-1.88 2.959-4.485 2.959-7.142 0-2.666-1.071-5.271-2.959-7.149-1.879-1.879-4.485-2.951-7.141-2.951s-5.253 1.072-7.143 2.951c-1.878 1.888-2.959 4.483-2.959 7.149 0 2.656 1.081 5.252 2.959 7.142 1.881 1.878 4.487 2.959 7.143 2.959z"/><path d="m286.9 177.075c-5.576 0-10.102 4.523-10.102 10.099s4.525 10.101 10.102 10.101c5.584 0 10.1-4.524 10.1-10.101 0-5.576-4.516-10.099-10.1-10.099z"/><path d="m286.9 141.096c-5.576 0-10.102 4.525-10.102 10.101s4.525 10.101 10.102 10.101c5.584 0 10.1-4.524 10.1-10.101 0-5.576-4.516-10.101-10.1-10.101z"/><path d="m286.9 105.118c-5.576 0-10.102 4.525-10.102 10.101 0 5.587 4.525 10.1 10.102 10.1 5.584 0 10.1-4.514 10.1-10.1 0-5.575-4.516-10.101-10.1-10.101z"/></svg>`
    }
}
