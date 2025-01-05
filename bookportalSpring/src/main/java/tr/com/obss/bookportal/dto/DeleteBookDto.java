package tr.com.obss.bookportal.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteBookDto {
	
	@NotNull(message = "id connot be null")
    @Min(value = 0, message = "id should not be less than 0")
	private Long id;
	
	
	
}
