sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, UIComponent, MessageToast, JSONModel) => {
    "use strict"

   return Controller.extend("appcrud.controller.RegisterTableView", {
        onInit:function(){    
            const oRouter = UIComponent.getRouterFor(this)
            oRouter.getRoute("RouteViewRegisters").attachPatternMatched(this.onRead, this)
            this.getView().setModel(new JSONModel([]),"lista")
        },

        onRead:function(){
            const oModel = this.getView().getModel()

            oModel.read("/UsuariosSet",{
                success: function({results}){
                    this.getView().getModel("lista").setData(results)
                }.bind(this),
                error: (oError) => {
                    MessageToast.show("Erro ao buscar os dados")
                }
           })
        }, 

        onNavBack: function(){
            const oRouter = UIComponent.getRouterFor(this)
            oRouter.navTo("RouteView1")
        },

        onDelete:function(oEvt){
            const oData = oEvt.getParameter("listItem").getBindingContext("lista").getObject()
            const oModel = this.getView().getModel()

            oModel.remove(`/UsuariosSet(${oData.ID})`,{
                success:function(oData2,oResponse){
                    MessageToast.show("Deletado com sucesso");
                    this.onRead()
                }.bind(this),

                error:function(oError){
                    MessageToast.show("Erro em deletar")
                }
            })
        },

        onDetailPress:function(oEvt){
            const iID = oEvt.getSource().getBindingContext("lista").getObject().ID
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this)

            oRouter.navTo("RouteDetail", {
                id: iID
            })
        }
    });
});