'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-api-tutorial documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-0e5a7eba05181c688fa33dd1be99b6c2949220694d4755fab01d14466357b8552f9bfefe4270dae20ad0a2085b264d042b30b28a5076fe7efbf77abe1fc878c1"' : 'data-target="#xs-controllers-links-module-AuthModule-0e5a7eba05181c688fa33dd1be99b6c2949220694d4755fab01d14466357b8552f9bfefe4270dae20ad0a2085b264d042b30b28a5076fe7efbf77abe1fc878c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0e5a7eba05181c688fa33dd1be99b6c2949220694d4755fab01d14466357b8552f9bfefe4270dae20ad0a2085b264d042b30b28a5076fe7efbf77abe1fc878c1"' :
                                            'id="xs-controllers-links-module-AuthModule-0e5a7eba05181c688fa33dd1be99b6c2949220694d4755fab01d14466357b8552f9bfefe4270dae20ad0a2085b264d042b30b28a5076fe7efbf77abe1fc878c1"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-0e5a7eba05181c688fa33dd1be99b6c2949220694d4755fab01d14466357b8552f9bfefe4270dae20ad0a2085b264d042b30b28a5076fe7efbf77abe1fc878c1"' : 'data-target="#xs-injectables-links-module-AuthModule-0e5a7eba05181c688fa33dd1be99b6c2949220694d4755fab01d14466357b8552f9bfefe4270dae20ad0a2085b264d042b30b28a5076fe7efbf77abe1fc878c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0e5a7eba05181c688fa33dd1be99b6c2949220694d4755fab01d14466357b8552f9bfefe4270dae20ad0a2085b264d042b30b28a5076fe7efbf77abe1fc878c1"' :
                                        'id="xs-injectables-links-module-AuthModule-0e5a7eba05181c688fa33dd1be99b6c2949220694d4755fab01d14466357b8552f9bfefe4270dae20ad0a2085b264d042b30b28a5076fe7efbf77abe1fc878c1"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IsConfirmTokenValidConstraint.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsConfirmTokenValidConstraint</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IsUserExistsConstraint.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsUserExistsConstraint</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SessionSerializer.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SessionSerializer</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostModule-b884a499ac675c16b7ec01d491fd3da08895e3788281b75a9de93ab7fe38cf1c227e00a8e1d9bd54ac445a060d672c35b1debaa5080ce420ca4812d8d8e2f269"' : 'data-target="#xs-controllers-links-module-PostModule-b884a499ac675c16b7ec01d491fd3da08895e3788281b75a9de93ab7fe38cf1c227e00a8e1d9bd54ac445a060d672c35b1debaa5080ce420ca4812d8d8e2f269"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-b884a499ac675c16b7ec01d491fd3da08895e3788281b75a9de93ab7fe38cf1c227e00a8e1d9bd54ac445a060d672c35b1debaa5080ce420ca4812d8d8e2f269"' :
                                            'id="xs-controllers-links-module-PostModule-b884a499ac675c16b7ec01d491fd3da08895e3788281b75a9de93ab7fe38cf1c227e00a8e1d9bd54ac445a060d672c35b1debaa5080ce420ca4812d8d8e2f269"' }>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostModule-b884a499ac675c16b7ec01d491fd3da08895e3788281b75a9de93ab7fe38cf1c227e00a8e1d9bd54ac445a060d672c35b1debaa5080ce420ca4812d8d8e2f269"' : 'data-target="#xs-injectables-links-module-PostModule-b884a499ac675c16b7ec01d491fd3da08895e3788281b75a9de93ab7fe38cf1c227e00a8e1d9bd54ac445a060d672c35b1debaa5080ce420ca4812d8d8e2f269"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-b884a499ac675c16b7ec01d491fd3da08895e3788281b75a9de93ab7fe38cf1c227e00a8e1d9bd54ac445a060d672c35b1debaa5080ce420ca4812d8d8e2f269"' :
                                        'id="xs-injectables-links-module-PostModule-b884a499ac675c16b7ec01d491fd3da08895e3788281b75a9de93ab7fe38cf1c227e00a8e1d9bd54ac445a060d672c35b1debaa5080ce420ca4812d8d8e2f269"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' : 'data-target="#xs-injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' :
                                        'id="xs-injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-3f8882f1e06c52126f0d03764401d1ef6373a34bd80f0260c05640afc46afe87324533804bb31c9953e87953d71c0fc462d1ad9504f909a6aad4ce34524d51c1"' : 'data-target="#xs-injectables-links-module-UserModule-3f8882f1e06c52126f0d03764401d1ef6373a34bd80f0260c05640afc46afe87324533804bb31c9953e87953d71c0fc462d1ad9504f909a6aad4ce34524d51c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-3f8882f1e06c52126f0d03764401d1ef6373a34bd80f0260c05640afc46afe87324533804bb31c9953e87953d71c0fc462d1ad9504f909a6aad4ce34524d51c1"' :
                                        'id="xs-injectables-links-module-UserModule-3f8882f1e06c52126f0d03764401d1ef6373a34bd80f0260c05640afc46afe87324533804bb31c9953e87953d71c0fc462d1ad9504f909a6aad4ce34524d51c1"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UtilsModule.html" data-type="entity-link" >UtilsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UtilsModule-f6a6160de47be04b9a42fc3be05ec919f942ad32373f1bba0847883a6ffcf46bf13e4b9fe49db7cb3b2a0c2f621a92e4951f36ce65827be5bece89933a81ff1a"' : 'data-target="#xs-injectables-links-module-UtilsModule-f6a6160de47be04b9a42fc3be05ec919f942ad32373f1bba0847883a6ffcf46bf13e4b9fe49db7cb3b2a0c2f621a92e4951f36ce65827be5bece89933a81ff1a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UtilsModule-f6a6160de47be04b9a42fc3be05ec919f942ad32373f1bba0847883a6ffcf46bf13e4b9fe49db7cb3b2a0c2f621a92e4951f36ce65827be5bece89933a81ff1a"' :
                                        'id="xs-injectables-links-module-UtilsModule-f6a6160de47be04b9a42fc3be05ec919f942ad32373f1bba0847883a6ffcf46bf13e4b9fe49db7cb3b2a0c2f621a92e4951f36ce65827be5bece89933a81ff1a"' }>
                                        <li class="link">
                                            <a href="injectables/UtilService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UtilService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostController.html" data-type="entity-link" >PostController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddPostDto.html" data-type="entity-link" >AddPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConfirmUserDto.html" data-type="entity-link" >ConfirmUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignupDto.html" data-type="entity-link" >SignupDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IsUserExistsConstraint.html" data-type="entity-link" >IsUserExistsConstraint</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostService.html" data-type="entity-link" >PostService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SessionSerializer.html" data-type="entity-link" >SessionSerializer</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilService.html" data-type="entity-link" >UtilService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/IsAuthenticatedGuard.html" data-type="entity-link" >IsAuthenticatedGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsConfirmedGuard.html" data-type="entity-link" >IsConfirmedGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});