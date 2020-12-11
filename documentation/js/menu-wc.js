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
                    <a href="index.html" data-type="index-link">backend documentation</a>
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
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-195ecc1368cfd76e057b26eef0b8c487"' : 'data-target="#xs-controllers-links-module-AppModule-195ecc1368cfd76e057b26eef0b8c487"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-195ecc1368cfd76e057b26eef0b8c487"' :
                                            'id="xs-controllers-links-module-AppModule-195ecc1368cfd76e057b26eef0b8c487"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/HealthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-195ecc1368cfd76e057b26eef0b8c487"' : 'data-target="#xs-injectables-links-module-AppModule-195ecc1368cfd76e057b26eef0b8c487"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-195ecc1368cfd76e057b26eef0b8c487"' :
                                        'id="xs-injectables-links-module-AppModule-195ecc1368cfd76e057b26eef0b8c487"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CatsModule.html" data-type="entity-link">CatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CatsModule-2007a1cd6cbba36a602d3ebc0d502529"' : 'data-target="#xs-controllers-links-module-CatsModule-2007a1cd6cbba36a602d3ebc0d502529"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CatsModule-2007a1cd6cbba36a602d3ebc0d502529"' :
                                            'id="xs-controllers-links-module-CatsModule-2007a1cd6cbba36a602d3ebc0d502529"' }>
                                            <li class="link">
                                                <a href="controllers/CatsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CatsModule-2007a1cd6cbba36a602d3ebc0d502529"' : 'data-target="#xs-injectables-links-module-CatsModule-2007a1cd6cbba36a602d3ebc0d502529"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CatsModule-2007a1cd6cbba36a602d3ebc0d502529"' :
                                        'id="xs-injectables-links-module-CatsModule-2007a1cd6cbba36a602d3ebc0d502529"' }>
                                        <li class="link">
                                            <a href="injectables/CatsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CronModule.html" data-type="entity-link">CronModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CronModule-fb159cc2bbcb4119a8c9689e363e109a"' : 'data-target="#xs-injectables-links-module-CronModule-fb159cc2bbcb4119a8c9689e363e109a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CronModule-fb159cc2bbcb4119a8c9689e363e109a"' :
                                        'id="xs-injectables-links-module-CronModule-fb159cc2bbcb4119a8c9689e363e109a"' }>
                                        <li class="link">
                                            <a href="injectables/CronService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CronService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/QueueModule.html" data-type="entity-link">QueueModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-QueueModule-e393d6acf16c0ddc3d6406bad13b6604"' : 'data-target="#xs-controllers-links-module-QueueModule-e393d6acf16c0ddc3d6406bad13b6604"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-QueueModule-e393d6acf16c0ddc3d6406bad13b6604"' :
                                            'id="xs-controllers-links-module-QueueModule-e393d6acf16c0ddc3d6406bad13b6604"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HealthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/QueueController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">QueueController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-QueueModule-e393d6acf16c0ddc3d6406bad13b6604"' : 'data-target="#xs-injectables-links-module-QueueModule-e393d6acf16c0ddc3d6406bad13b6604"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-QueueModule-e393d6acf16c0ddc3d6406bad13b6604"' :
                                        'id="xs-injectables-links-module-QueueModule-e393d6acf16c0ddc3d6406bad13b6604"' }>
                                        <li class="link">
                                            <a href="injectables/QueueService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>QueueService</a>
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
                                    <a href="controllers/AppController.html" data-type="entity-link">AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CatsController.html" data-type="entity-link">CatsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link">HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/QueueController.html" data-type="entity-link">QueueController</a>
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
                                <a href="classes/Base.html" data-type="entity-link">Base</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cat.html" data-type="entity-link">Cat</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCatDto.html" data-type="entity-link">CreateCatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudController.html" data-type="entity-link">CrudController</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudService.html" data-type="entity-link">CrudService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Model.html" data-type="entity-link">Model</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link">PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCatDto.html" data-type="entity-link">UpdateCatDto</a>
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
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatsService.html" data-type="entity-link">CatsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CronService.html" data-type="entity-link">CronService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DBHelper.html" data-type="entity-link">DBHelper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QueueService.html" data-type="entity-link">QueueService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FileStorageOption.html" data-type="entity-link">FileStorageOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileSystem.html" data-type="entity-link">FileSystem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAddress.html" data-type="entity-link">IAddress</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthLoginInput.html" data-type="entity-link">IAuthLoginInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAuthResponse.html" data-type="entity-link">IAuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseEntityModel.html" data-type="entity-link">IBaseEntityModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICountry.html" data-type="entity-link">ICountry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICrudService.html" data-type="entity-link">ICrudService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICurrency.html" data-type="entity-link">ICurrency</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGeoLocationCreateObject.html" data-type="entity-link">IGeoLocationCreateObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IGeolocationUpdateObject.html" data-type="entity-link">IGeolocationUpdateObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILanguage.html" data-type="entity-link">ILanguage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILanguageFindInput.html" data-type="entity-link">ILanguageFindInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILanguageName.html" data-type="entity-link">ILanguageName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IListQueryInput.html" data-type="entity-link">IListQueryInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILocation.html" data-type="entity-link">ILocation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPagination.html" data-type="entity-link">IPagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPagination-1.html" data-type="entity-link">IPagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginationInput.html" data-type="entity-link">IPaginationInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRole.html" data-type="entity-link">IRole</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRolePermission.html" data-type="entity-link">IRolePermission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRolePermissionCreateInput.html" data-type="entity-link">IRolePermissionCreateInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRolePermissionUpdateInput.html" data-type="entity-link">IRolePermissionUpdateInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITreeNode.html" data-type="entity-link">ITreeNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITryRequest.html" data-type="entity-link">ITryRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link">IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserCreateInput.html" data-type="entity-link">IUserCreateInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserFindInput.html" data-type="entity-link">IUserFindInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserRegistrationInput.html" data-type="entity-link">IUserRegistrationInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserUpdateInput.html" data-type="entity-link">IUserUpdateInput</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/S3FileStorageProviderConfig.html" data-type="entity-link">S3FileStorageProviderConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadedFile.html" data-type="entity-link">UploadedFile</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
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