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
                                            'data-target="#controllers-links-module-AppModule-e28b5c60dcdbaf8457f2da0c4f288d02"' : 'data-target="#xs-controllers-links-module-AppModule-e28b5c60dcdbaf8457f2da0c4f288d02"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e28b5c60dcdbaf8457f2da0c4f288d02"' :
                                            'id="xs-controllers-links-module-AppModule-e28b5c60dcdbaf8457f2da0c4f288d02"' }>
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
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-87b41908f08ea099815b5575e98ffd0e"' : 'data-target="#xs-controllers-links-module-AuthModule-87b41908f08ea099815b5575e98ffd0e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-87b41908f08ea099815b5575e98ffd0e"' :
                                            'id="xs-controllers-links-module-AuthModule-87b41908f08ea099815b5575e98ffd0e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-87b41908f08ea099815b5575e98ffd0e"' : 'data-target="#xs-injectables-links-module-AuthModule-87b41908f08ea099815b5575e98ffd0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-87b41908f08ea099815b5575e98ffd0e"' :
                                        'id="xs-injectables-links-module-AuthModule-87b41908f08ea099815b5575e98ffd0e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GoogleStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CronModule.html" data-type="entity-link">CronModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CronModule-e14a5c20facc463d0eac84269211c900"' : 'data-target="#xs-injectables-links-module-CronModule-e14a5c20facc463d0eac84269211c900"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CronModule-e14a5c20facc463d0eac84269211c900"' :
                                        'id="xs-injectables-links-module-CronModule-e14a5c20facc463d0eac84269211c900"' }>
                                        <li class="link">
                                            <a href="injectables/CronService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CronService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PersistedCronService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PersistedCronService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link">DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link">EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailModule-b9b006b21f0801936320689a20a32379"' : 'data-target="#xs-injectables-links-module-EmailModule-b9b006b21f0801936320689a20a32379"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-b9b006b21f0801936320689a20a32379"' :
                                        'id="xs-injectables-links-module-EmailModule-b9b006b21f0801936320689a20a32379"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailSchedulingModule.html" data-type="entity-link">EmailSchedulingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-EmailSchedulingModule-8758bade57ad40022857545e9a305f13"' : 'data-target="#xs-controllers-links-module-EmailSchedulingModule-8758bade57ad40022857545e9a305f13"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-EmailSchedulingModule-8758bade57ad40022857545e9a305f13"' :
                                            'id="xs-controllers-links-module-EmailSchedulingModule-8758bade57ad40022857545e9a305f13"' }>
                                            <li class="link">
                                                <a href="controllers/EmailSchedulingController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EmailSchedulingController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EmailSchedulingModule-8758bade57ad40022857545e9a305f13"' : 'data-target="#xs-injectables-links-module-EmailSchedulingModule-8758bade57ad40022857545e9a305f13"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailSchedulingModule-8758bade57ad40022857545e9a305f13"' :
                                        'id="xs-injectables-links-module-EmailSchedulingModule-8758bade57ad40022857545e9a305f13"' }>
                                        <li class="link">
                                            <a href="injectables/EmailSchedulingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EmailSchedulingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link">TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TagsModule-e180e260f387893308ff7de32eb6ffc8"' : 'data-target="#xs-controllers-links-module-TagsModule-e180e260f387893308ff7de32eb6ffc8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-e180e260f387893308ff7de32eb6ffc8"' :
                                            'id="xs-controllers-links-module-TagsModule-e180e260f387893308ff7de32eb6ffc8"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TagsModule-e180e260f387893308ff7de32eb6ffc8"' : 'data-target="#xs-injectables-links-module-TagsModule-e180e260f387893308ff7de32eb6ffc8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-e180e260f387893308ff7de32eb6ffc8"' :
                                        'id="xs-injectables-links-module-TagsModule-e180e260f387893308ff7de32eb6ffc8"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-ca8e6de171501e7231825dc974c9d1e3"' : 'data-target="#xs-controllers-links-module-UsersModule-ca8e6de171501e7231825dc974c9d1e3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-ca8e6de171501e7231825dc974c9d1e3"' :
                                            'id="xs-controllers-links-module-UsersModule-ca8e6de171501e7231825dc974c9d1e3"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-ca8e6de171501e7231825dc974c9d1e3"' : 'data-target="#xs-injectables-links-module-UsersModule-ca8e6de171501e7231825dc974c9d1e3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-ca8e6de171501e7231825dc974c9d1e3"' :
                                        'id="xs-injectables-links-module-UsersModule-ca8e6de171501e7231825dc974c9d1e3"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsersService</a>
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
                                    <a href="controllers/AuthController.html" data-type="entity-link">AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EmailSchedulingController.html" data-type="entity-link">EmailSchedulingController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link">HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TagsController.html" data-type="entity-link">TagsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link">UsersController</a>
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
                                <a href="classes/ApiException.html" data-type="entity-link">ApiException</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseModel.html" data-type="entity-link">BaseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagsDto.html" data-type="entity-link">CreateTagsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudConfigService.html" data-type="entity-link">CrudConfigService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudController.html" data-type="entity-link">CrudController</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudRoutesFactory.html" data-type="entity-link">CrudRoutesFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudService.html" data-type="entity-link">CrudService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomQueryBuilder.html" data-type="entity-link">CustomQueryBuilder</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailScheduleDto.html" data-type="entity-link">EmailScheduleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/IsEmailExistsConstraint.html" data-type="entity-link">IsEmailExistsConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link">PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryFailedFilter.html" data-type="entity-link">QueryFailedFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/R.html" data-type="entity-link">R</a>
                            </li>
                            <li class="link">
                                <a href="classes/SerializeHelper.html" data-type="entity-link">SerializeHelper</a>
                            </li>
                            <li class="link">
                                <a href="classes/Swagger.html" data-type="entity-link">Swagger</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tag.html" data-type="entity-link">Tag</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTagsDto.html" data-type="entity-link">UpdateTagsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link">UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link">UserLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationFailedFilter.html" data-type="entity-link">ValidationFailedFilter</a>
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
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CronService.html" data-type="entity-link">CronService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailSchedulingService.html" data-type="entity-link">EmailSchedulingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link">EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcludeNullUndefinedInterceptor.html" data-type="entity-link">ExcludeNullUndefinedInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleStrategy.html" data-type="entity-link">GoogleStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link">JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link">LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersistedCronService.html" data-type="entity-link">PersistedCronService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TagsService.html" data-type="entity-link">TagsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link">TimeoutInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link">TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
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
                                <a href="guards/RequestGuard.html" data-type="entity-link">RequestGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/ResponseGuard.html" data-type="entity-link">ResponseGuard</a>
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
                                <a href="interfaces/APIResponse.html" data-type="entity-link">APIResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppLaunchAction.html" data-type="entity-link">AppLaunchAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseRoute.html" data-type="entity-link">BaseRoute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Comment.html" data-type="entity-link">Comment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Comments.html" data-type="entity-link">Comments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CrudOptions.html" data-type="entity-link">CrudOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Follower.html" data-type="entity-link">Follower</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetAppLaunchData.html" data-type="entity-link">GetAppLaunchData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetComments.html" data-type="entity-link">GetComments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetFollowers.html" data-type="entity-link">GetFollowers</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetFollowing.html" data-type="entity-link">GetFollowing</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetManyDefaultResponse.html" data-type="entity-link">GetManyDefaultResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetRescueList.html" data-type="entity-link">GetRescueList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetUserPosts.html" data-type="entity-link">GetUserPosts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetUserProfile.html" data-type="entity-link">GetUserProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseModel.html" data-type="entity-link">IBaseModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICrudService.html" data-type="entity-link">ICrudService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPaginationResult.html" data-type="entity-link">IPaginationResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITag.html" data-type="entity-link">ITag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link">IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParamOption.html" data-type="entity-link">ParamOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ParamsOptions.html" data-type="entity-link">ParamsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostedByUser.html" data-type="entity-link">PostedByUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostType.html" data-type="entity-link">PostType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RescueLists.html" data-type="entity-link">RescueLists</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rescues.html" data-type="entity-link">Rescues</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link">Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Result.html" data-type="entity-link">Result</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPost.html" data-type="entity-link">UserPost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPosts.html" data-type="entity-link">UserPosts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerifiedTokenPayload.html" data-type="entity-link">VerifiedTokenPayload</a>
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
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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
                            <img data-src="images/compodoc-vectorise-inverted.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});