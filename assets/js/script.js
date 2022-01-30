$(document).ready(function() {

    $("#superHero-input").on('input', function(evt) {
        $(this).val(jQuery(this).val().replace(/[^0-9]/g, ''));
    })

    $("#form-superHero").submit(function(e) {
        e.preventDefault();

        let valueInput = $("#superHero-input").val();

        if (valueInput > 0 && valueInput < 733) {
            $.ajax({

                url: "https://superheroapi.com/api.php/2957577794560794/" + valueInput,
                success: function(data) {
                    console.log(data);
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
                        }, ],
                    };
                    var chart = new CanvasJS.Chart("hero-stats", config);
                    chart.render();
                }
            });
        } else {
            alert("El número ingresado debe ser entre 1 y 732")
        }
    });
});