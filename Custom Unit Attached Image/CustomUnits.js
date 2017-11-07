tau.mashups
    .addDependency('jQuery')
    .addDependency('Underscore')
    .addDependency('tau/configurator')
    .addDependency('tau/models/board.customize.units/const.entity.types.names')
    .addDependency('tau/models/board.customize.units/const.card.sizes')
    .addDependency('tau/models/board.customize.units/board.customize.units.base')
    .addMashup(function($, _, globalConfigurator, types, sizes, helper) {

        var units = [
            {
                id: 'attachment_thumbnail',
                classId: 'tau-board-unit_type_attachment-thumbnail',
                hideIf: function(data) {
                    return !data.attachments.length || data.attachments.length === 0;
                },
                name: 'Attachment thumbnail',
                types: [
                    types.FEATURE, types.STORY, types.TASK, types.BUG, types.REQUEST, types.TEST_CASE, types.IMPEDIMENT, types.ITERATION,
                    types.TEAM_ITERATION, types.RELEASE, types.TEST_PLAN, types.TEST_PLAN_RUN, types.BUILD, types.EPIC
                ],
                sizes: [sizes.XS, sizes.S, sizes.M, sizes.L],
                template: {
                    markup: [
                        '<div class="tau-board-unit__value" style=" max-width: 100%; max-height: 100%; width: 100%;">',
                            '<img style="width: 100%;" src="<%! fn.getImage(this.data.attachments).replace("width=100", "width=500").replace("height=100", "height=500") %>">',
                        '</div>'
                    ],
                    customFunctions: {
                        getImage: function(attachments) {
                            //for (var i = 0; i < attachments.length; i++) { //use this option to get the first image in the list
                            for (var i = attachments.length-1; i >=0 ; i--) { //use this option to get the last image in the list
                                if(attachments[i].mimeType.indexOf('image') >= 0) {
                                    return attachments[i].thumbnailUri;
                                }
                            }
                            return "";
                        }
                    }
                },
                sampleData: { 
                    attachments: [ 
                        { 
                            thumbnailUri: helper.url('/Javascript/tau/css/images/icons/users/mick.png'),
                            mimeType: 'image/png'
                        } 
                    ] 
                    
                },
                model: 'attachments:attachments.Select({thumbnailUri,mimeType})',
                priority: 2
            }
        ];

        function addUnits(configurator) {
            var registry = configurator.getUnitsRegistry();
            _.extend(registry.units, registry.register(units));
        }


        var appConfigurator;
        globalConfigurator.getGlobalBus().on('configurator.ready', function(e, configurator) {

            if (!appConfigurator && configurator._id && configurator._id.match(/board/)) {

                appConfigurator = configurator;
                addUnits(appConfigurator);

            }

        });

 });
