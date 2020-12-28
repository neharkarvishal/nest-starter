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
                                            'data-target="#controllers-links-module-AppModule-add700ab148a0b7be50f6742ad685d11"' : 'data-target="#xs-controllers-links-module-AppModule-add700ab148a0b7be50f6742ad685d11"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-add700ab148a0b7be50f6742ad685d11"' :
                                            'id="xs-controllers-links-module-AppModule-add700ab148a0b7be50f6742ad685d11"' }>
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
                                        'data-target="#injectables-links-module-AppModule-add700ab148a0b7be50f6742ad685d11"' : 'data-target="#xs-injectables-links-module-AppModule-add700ab148a0b7be50f6742ad685d11"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-add700ab148a0b7be50f6742ad685d11"' :
                                        'id="xs-injectables-links-module-AppModule-add700ab148a0b7be50f6742ad685d11"' }>
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
                                            'data-target="#controllers-links-module-CatsModule-8bd71983017b37adcdca8f875d8b3351"' : 'data-target="#xs-controllers-links-module-CatsModule-8bd71983017b37adcdca8f875d8b3351"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CatsModule-8bd71983017b37adcdca8f875d8b3351"' :
                                            'id="xs-controllers-links-module-CatsModule-8bd71983017b37adcdca8f875d8b3351"' }>
                                            <li class="link">
                                                <a href="controllers/CatsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CatsModule-8bd71983017b37adcdca8f875d8b3351"' : 'data-target="#xs-injectables-links-module-CatsModule-8bd71983017b37adcdca8f875d8b3351"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CatsModule-8bd71983017b37adcdca8f875d8b3351"' :
                                        'id="xs-injectables-links-module-CatsModule-8bd71983017b37adcdca8f875d8b3351"' }>
                                        <li class="link">
                                            <a href="injectables/CatsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CronModule.html" data-type="entity-link">CronModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CronModule-b3cc00d4dc32a3e780b1301ef1b105b2"' : 'data-target="#xs-injectables-links-module-CronModule-b3cc00d4dc32a3e780b1301ef1b105b2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CronModule-b3cc00d4dc32a3e780b1301ef1b105b2"' :
                                        'id="xs-injectables-links-module-CronModule-b3cc00d4dc32a3e780b1301ef1b105b2"' }>
                                        <li class="link">
                                            <a href="injectables/CronService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CronService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-536aea71226614f6cbf9a4afc1df9956"' : 'data-target="#xs-controllers-links-module-UsersModule-536aea71226614f6cbf9a4afc1df9956"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-536aea71226614f6cbf9a4afc1df9956"' :
                                            'id="xs-controllers-links-module-UsersModule-536aea71226614f6cbf9a4afc1df9956"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-536aea71226614f6cbf9a4afc1df9956"' : 'data-target="#xs-injectables-links-module-UsersModule-536aea71226614f6cbf9a4afc1df9956"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-536aea71226614f6cbf9a4afc1df9956"' :
                                        'id="xs-injectables-links-module-UsersModule-536aea71226614f6cbf9a4afc1df9956"' }>
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
                                    <a href="controllers/CatsController.html" data-type="entity-link">CatsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link">HealthController</a>
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
                                <a href="classes/Base.html" data-type="entity-link">Base</a>
                            </li>
                            <li class="link">
                                <a href="classes/Cat.html" data-type="entity-link">Cat</a>
                            </li>
                            <li class="link">
                                <a href="classes/CatRepository.html" data-type="entity-link">CatRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCatDto.html" data-type="entity-link">CreateCatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link">CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudController.html" data-type="entity-link">CrudController</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrudService.html" data-type="entity-link">CrudService</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetCatResponseDto.html" data-type="entity-link">GetCatResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserResponseDto.html" data-type="entity-link">GetUserResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Model.html" data-type="entity-link">Model</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationParams.html" data-type="entity-link">PaginationParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryFailedFilter.html" data-type="entity-link">QueryFailedFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCatDto.html" data-type="entity-link">UpdateCatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link">UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRepository.html" data-type="entity-link">UserRepository</a>
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
                                    <a href="injectables/ExcludeNullUndefinedInterceptor.html" data-type="entity-link">ExcludeNullUndefinedInterceptor</a>
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
                                <a href="interfaces/Comment.html" data-type="entity-link">Comment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Comments.html" data-type="entity-link">Comments</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Follower.html" data-type="entity-link">Follower</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Following.html" data-type="entity-link">Following</a>
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
                                <a href="interfaces/GetRescueList.html" data-type="entity-link">GetRescueList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetUserPosts.html" data-type="entity-link">GetUserPosts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetUserProfile.html" data-type="entity-link">GetUserProfile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBaseEntityModel.html" data-type="entity-link">IBaseEntityModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICrudService.html" data-type="entity-link">ICrudService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPagination.html" data-type="entity-link">IPagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPagination-1.html" data-type="entity-link">IPagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITryRequest.html" data-type="entity-link">ITryRequest</a>
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
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPost.html" data-type="entity-link">UserPost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPosts.html" data-type="entity-link">UserPosts</a>
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
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});