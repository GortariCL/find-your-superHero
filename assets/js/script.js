//DOM listo para iniciar
$(document).ready(function () {

    //Validación de input Solo deja ingresar números
//     $("#superHero-input").on('input', function (evt) {
//         $(this).val(jQuery(this).val().replace(/[^0-9]/g, ''));
//     })

    $(function(){
        $('#superhero-info').hide();
        $('button').on('click', function (e) {
            $('#superhero-info').show();
        });
    });  

    //Inicio de la función para muestra de datos
    $("#form-superHero").submit(function (e) {
        e.preventDefault();        

        let valueInput = $("#superHero-input").val();
        //Validación de que el número ingresado sea entre la cantidad de personajes
        if (valueInput > 0 && valueInput < 733) {
            //Solicitud hacia la API
            $.ajax({

                url: "https://superheroapi.com/api.php/138872745600547/search/" + valueInput,
                success: function (data) {
                    console.log(data);
                    //Obtención de datos desde la API
                    let img = data.image.url;
                    let name = data.name;
                    let fullName = data.biography["full-name"];
                    let connections = data.connections["group-affiliation"];
                    let publisher = data.biography.publisher;
                    let occupation = data.work.occupation;
                    let firstAppearance = data.biography["first-appearance"];
                    let height = data.appearance.height;
                    let weight = data.appearance.weight;
                    let aliases = data.biography.aliases;
                    //Integración datos de superHeroe
                    $("#hero-info").html(`
                    <div id="superHero-card" class="card mb-3" style="max-width: 54rem;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src=${img} class="card-img-top" style="height: 100%">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">Nombre: ${name}</h3>
                                <h6 class="card-text">Nombre Real: ${fullName}</h6>
                                <h6 class="card-text">Conexiones: ${connections}</h6>
                                <hr>
                                <h6 class="card-text"><small>Publicado por: ${publisher}</small></h6>
                                <h6 class="card-text"><small>Ocupación: ${occupation}</small></h6>
                                <h6 class="card-text"><small>Primera Aparición: ${firstAppearance}</small></h6>
                                <h6 class="card-text"><small>Altura: ${height}</small></h6>
                                <h6 class="card-text"><small>Peso: ${weight}</small></h6>
                                <h6 class="card-text"><small>Alias: ${aliases}</small></h6>
                            </div>
                        </div>
                    </div>
                </div>            
                `);
                    //Integración CanvasJS
                    let dataPowerstats = data.powerstats;
                    let heroStats = [];

                    for (property in dataPowerstats) {
                        heroStats.push({
                            label: property,
                            y: dataPowerstats[property],
                        });
                    };

                    let config = {
                        backgroundColor: "#000000",
                        textColor: "#FFFFFF",
                        animationEnabled: true,
                        title: {
                            text: `Estadisticas de Poder para ${name}`,
                            fontColor: "#FFFFFF",
                        },
                        legend: {
                            fontColor: "#FFFFFF",
                        },
                        data: [{
                            type: "pie",
                            showInLegend: true,
                            legendText: "{label}",
                            dataPoints: heroStats,
                            indexLabelFontColor: "#FFFFFF",
                            indexLabel: "{label} - {y}"
                        },],
                    };
                    var chart = new CanvasJS.Chart("hero-stats", config);
                    chart.render();
                }
            });
        //Alert en caso de que el número ingresado no se encuentre dentro de los parametros
        }else {
            alert("El número ingresado debe ser entre 1 y 732");
            $('#superhero-info').hide(300);
        };
    });
});
