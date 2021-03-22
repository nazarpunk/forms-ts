// noinspection JSUnusedGlobalSymbols
const Forms = {

	fixate: ($form: HTMLFormElement) => {
		for (const $e of $form.elements) {
			if (!($e instanceof HTMLElement)) continue;
			switch ($e.nodeName.toLowerCase()) {
				case `textarea`:
					if (!($e instanceof HTMLTextAreaElement)) continue
					$e.defaultValue = $e.value;
					break;
				case `input`:
					if (!($e instanceof HTMLInputElement)) continue;
					switch ($e.type.toLowerCase()) {
						case `checkbox`:
						case `radio`:
							$e.defaultChecked = $e.checked;
							break;
						default:
							$e.defaultValue = $e.value;
							break;
					}
					break;
			}
		}
	},

	changes: ($form: HTMLFormElement): HTMLElement[] => {
		let changed: HTMLElement[] = [];
		for (const $e of $form.elements) {
			if (!($e instanceof HTMLElement)) continue;
			let c = false;
			switch ($e.nodeName.toLowerCase()) {
				case `select`:
					if (!($e instanceof HTMLSelectElement)) continue;
					let def = 0;
					for (let o = 0, ol = $e.options.length; o < ol; o++) {
						const opt = $e.options[o];
						c = c || (opt.selected != opt.defaultSelected);
						if (opt.defaultSelected) def = o;
					}
					if (c && !$e.multiple) c = (def != $e.selectedIndex);
					break;
				case `textarea`:
					if (!($e instanceof HTMLTextAreaElement)) continue
					c = ($e.value != $e.defaultValue);
					break;
				case `input`:
					if (!($e instanceof HTMLInputElement)) continue;
					switch ($e.type.toLowerCase()) {
						case `checkbox`:
						case `radio`:
							c = ($e.checked != $e.defaultChecked);
							break;
						default:
							c = ($e.value != $e.defaultValue);
							break;
					}
					break;
			}

			if (c) changed.push($e);
		}
		return changed;
	}
}

export {Forms};