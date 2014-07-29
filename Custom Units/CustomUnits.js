tau.mashups
    .addDependency('jQuery')
    .addDependency('Underscore')
    .addDependency('tau/core/bus.reg')
    .addDependency('tau/models/board.customize.units/const.entity.types.names')
    .addDependency('tau/models/board.customize.units/const.card.sizes')
    .addDependency('tau/models/board.customize.units/board.customize.units.base')
    .addMashup(function($, _, busRegistry, et, sz, helper) {

        var units = [
            {
                id: 'attachment_thumbnail',
                classId: 'tau-board-unit_type_attachment-thumbnail',
                hideIf: function(data) {
                    return !data.attachments.length;
                },
                name: 'Attachment thumbnail',
                types: [
                    et.FEATURE, et.STORY, et.TASK, et.BUG, et.REQUEST, et.TEST_CASE, et.IMPEDIMENT, et.ITERATION,
                    et.TEAM_ITERATION, et.RELEASE, et.TEST_PLAN, et.TEST_PLAN_RUN, et.BUILD
                ],
                sizes: [sz.XS, sz.S, sz.M, sz.L],
                template: [
                    '<div class="tau-board-unit__value" style=" max-width: 100%; max-height: 100%; width: 100%;">',
                    '<img style="width: 100%;" src="<%! this.data.attachments[0].thumbnailUri.replace("width=100", "width=200").replace("height=200", "height=100") %>">',
                    '</div>'
                ],
                sampleData: { attachments: [ { thumbnailUri: helper.url('/Javascript/tau/css/images/icons/users/karat.png?size=') } ] },
                model: 'attachments:attachments.Select({thumbnailUri})'
            }
        ];

        function addUnits(configurator) {
            var registry = configurator.getUnitsRegistry();
            _.extend(registry.units, registry.register(units));
        }


        busRegistry.getByName('globalBus').done($.proxy(function(bus) {
            bus.on('configurator.ready', $.proxy(function(e, configurator) {


                addUnits(configurator);


            }, this));
        }, this));

    });